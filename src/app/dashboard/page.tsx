import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Eye,
  MousePointerClick,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

async function getDashboardData(userId: string) {
  const campaigns = await prisma.campaign.findMany({
    where: { userId },
    include: { placement: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { placement: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const aggregate = await prisma.campaign.aggregate({
    where: { userId },
    _sum: { impressions: true, clicks: true, conversions: true, spend: true },
  });

  const totalImpressions = aggregate._sum.impressions || 0;
  const totalClicks = aggregate._sum.clicks || 0;
  const totalSpend = aggregate._sum.spend || 0;
  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  return { campaigns, orders, totalImpressions, totalClicks, totalSpend, ctr };
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return null;

  const data = await getDashboardData(user.id);

  const statusColor: Record<string, "success" | "warning" | "destructive" | "default"> = {
    ACTIVE: "success",
    PENDING_REVIEW: "warning",
    DRAFT: "default",
    PAUSED: "warning",
    COMPLETED: "default",
    REJECTED: "destructive",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back, {user.name}</p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button>
            <Megaphone className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Impressions", value: formatNumber(data.totalImpressions), icon: Eye, change: "" },
          { label: "Total Clicks", value: formatNumber(data.totalClicks), icon: MousePointerClick, change: "" },
          { label: "CTR", value: `${data.ctr.toFixed(2)}%`, icon: TrendingUp, change: "" },
          { label: "Total Spend", value: formatCurrency(Number(data.totalSpend)), icon: DollarSign, change: "" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500">{stat.label}</span>
                <stat.icon className="h-4 w-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {data.campaigns.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No campaigns yet</p>
                <Link
                  href="/dashboard/campaigns/new"
                  className="text-indigo-600 text-sm hover:text-indigo-500"
                >
                  Create your first campaign
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {data.campaigns.map((campaign) => (
                  <Link
                    key={campaign.id}
                    href={`/dashboard/campaigns/${campaign.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {campaign.title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {campaign.placement.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={statusColor[campaign.status] || "default"}>
                        {campaign.status.replace(/_/g, " ")}
                      </Badge>
                      <ArrowUpRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {data.orders.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No orders yet</p>
                <Link
                  href="/ad-placements"
                  className="text-indigo-600 text-sm hover:text-indigo-500"
                >
                  Browse placemenets
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {data.orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {order.placement.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatDate(order.createdAt)} &bull; {order.durationType}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900">
                        {formatCurrency(Number(order.totalPrice))}
                      </div>
                      <Badge
                        variant={
                          order.status === "PAID" || order.status === "APPROVED"
                            ? "success"
                            : order.status === "REJECTED" || order.status === "CANCELLED"
                            ? "destructive"
                            : "warning"
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
