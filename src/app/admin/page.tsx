import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, ShoppingBag, Image, Eye, MousePointerClick } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [
    totalPlacements,
    totalAdvertisers,
    totalOrders,
    pendingApprovals,
    campaignAgg,
  ] = await Promise.all([
    prisma.adPlacement.count(),
    prisma.user.count({ where: { role: "ADVERTISER" } }),
    prisma.order.count(),
    prisma.campaign.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.campaign.aggregate({
      _sum: { impressions: true, clicks: true, spend: true },
    }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true } }, placement: { select: { name: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Placements", value: totalPlacements.toLocaleString(), icon: Image, href: "/admin/placements" },
          { label: "Advertisers", value: totalAdvertisers.toLocaleString(), icon: Users, href: "/admin/advertisers" },
          { label: "Orders", value: totalOrders.toLocaleString(), icon: ShoppingBag, href: "/admin/orders" },
          { label: "Pending Approvals", value: pendingApprovals.toLocaleString(), icon: Eye, href: "/admin/approvals" },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">{stat.label}</span>
                  <stat.icon className="h-4 w-4 text-slate-400" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Campaign Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Impressions", value: formatNumber(campaignAgg._sum.impressions || 0), icon: Eye },
                { label: "Total Clicks", value: formatNumber(campaignAgg._sum.clicks || 0), icon: MousePointerClick },
                { label: "Total Spend", value: formatCurrency(Number(campaignAgg._sum.spend || 0)), icon: DollarSign },
                { label: "CTR", value: campaignAgg._sum.impressions && campaignAgg._sum.impressions > 0
                  ? `${((campaignAgg._sum.clicks || 0) / campaignAgg._sum.impressions * 100).toFixed(2)}%`
                  : "0%", icon: Eye },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-50 rounded-lg p-4">
                  <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
                  <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between text-sm py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <span className="font-medium text-slate-900">{order.placement.name}</span>
                    <span className="text-slate-500 ml-2">by {order.user.name}</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(Number(order.totalPrice))}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
