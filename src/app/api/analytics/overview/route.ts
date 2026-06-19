import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const campaigns = await prisma.campaign.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      title: true,
      impressions: true,
      clicks: true,
      conversions: true,
    },
  });

  const totals = campaigns.reduce(
    (acc, c) => ({
      totalImpressions: acc.totalImpressions + c.impressions,
      totalClicks: acc.totalClicks + c.clicks,
      totalConversions: acc.totalConversions + c.conversions,
    }),
    { totalImpressions: 0, totalClicks: 0, totalConversions: 0 }
  );

  const data = {
    ...totals,
    totalRevenue: 0,
    campaigns: campaigns.map((c) => ({
      ...c,
      ctr: c.impressions > 0 ? (c.clicks / c.impressions) * 100 : 0,
    })),
  };

  return NextResponse.json(data);
}
