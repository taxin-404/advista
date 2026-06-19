import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email || (session.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const formData = await req.formData();
  const action = formData.get("action") as string;

  if (!action || !["APPROVED", "REJECTED"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const admin = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id },
  });
  if (!campaign || campaign.status !== "PENDING_REVIEW") {
    return NextResponse.json(
      { error: "Campaign not found or not pending" },
      { status: 404 }
    );
  }

  await prisma.$transaction([
    prisma.campaign.update({
      where: { id },
      data: { status: action as any },
    }),
    prisma.adApproval.create({
      data: {
        campaignId: id,
        adminId: admin.id,
        status: action as any,
        reason: null,
      },
    }),
  ]);

  return NextResponse.redirect(
    new URL("/admin/approvals", req.url)
  );
}
