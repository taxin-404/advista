import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const placements = await prisma.adPlacement.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true, slug: true },
  });
  return NextResponse.json(placements);
}
