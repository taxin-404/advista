import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { calculateEndDate } from "@/lib/utils";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return NextResponse.json([], { status: 404 });

  const campaigns = await prisma.campaign.findMany({
    where: { userId: user.id },
    include: { placement: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(campaigns);
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { title, targetUrl, altText, placementId, orderId } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { placement: true },
    });

    if (!order || order.userId !== user.id) {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 });
    }

    const campaign = await prisma.campaign.create({
      data: {
        userId: user.id,
        orderId,
        placementId,
        title,
        targetUrl,
        altText,
        startDate: order.startDate,
        endDate: order.endDate,
        status: "PENDING_REVIEW",
      },
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error("Create campaign error:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}
