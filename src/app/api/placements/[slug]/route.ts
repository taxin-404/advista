import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const placement = await prisma.adPlacement.findUnique({ where: { slug } });
  if (!placement) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(placement);
}
