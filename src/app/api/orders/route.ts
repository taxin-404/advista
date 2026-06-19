import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return NextResponse.json([], { status: 404 });

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { placement: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
