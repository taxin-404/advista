import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, Users, Eye, MousePointerClick, DollarSign, ShoppingBag } from "lucide-react";

export default async function AdminReportsPage() {
  const [totalUsers, totalCampaigns, totalOrders, campaignAgg] = await Promise.all([
    prisma.user.count({ where: { role: "ADVERTISER" } }),
    prisma.campaign.count(),
    prisma.order.count(),
    prisma.campaign.aggregate({
      _sum: { impressions: true, clicks: true, conversions: true, spend: true },
    }),
  ]);

  const monthlyData = [
    { month: "Jan", impressions: 125000, clicks: 4200 },
    { month: "Feb", impressions: 142000, clicks: 5100 },
    { month: "Mar", impressions: 165000, clicks: 5800 },
    { month: "Apr", impressions: 182000, clicks: 6200 },
    { month: "May", impressions: 198000, clicks: 7100 },
    { month: "Jun", impressions: 215000, clicks: 7800 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Reports</h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Advertisers", value: totalUsers.toLocaleString(), icon: Users },
          { label: "Total Campaigns", value: totalCampaigns.toLocaleString(), icon: ShoppingBag },
          { label: "Total Orders", value: totalOrders.toLocaleString(), icon: ShoppingBag },
          { label: "Impressions", value: formatNumber(campaignAgg._sum.impressions || 0), icon: Eye },
          { label: "Revenue", value: formatCurrency(Number(campaignAgg._sum.spend || 0)), icon: DollarSign },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500">{stat.label}</span>
                <stat.icon className="h-3 w-3 text-slate-400" />
              </div>
              <div className="text-lg font-bold text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Trends (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyData.map((m) => (
                <div key={m.month}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 font-medium">{m.month}</span>
                    <span className="text-slate-500">
                      {formatNumber(m.impressions)} imp / {formatNumber(m.clicks)} cl
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-indigo-600 rounded-l-full"
                      style={{ width: `${(m.impressions / 250000) * 100}%` }}
                    />
                    <div
                      className="h-full bg-emerald-500 rounded-r-full"
                      style={{ width: `${(m.clicks / 250000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Homepage Hero Banner", impressions: 245000, ctr: 3.2 },
                { name: "Header Leaderboard", impressions: 198000, ctr: 2.8 },
                { name: "Sidebar Rectangle", impressions: 142000, ctr: 2.1 },
                { name: "Sponsored Post", impressions: 98000, ctr: 4.5 },
                { name: "Footer Banner", impressions: 85000, ctr: 1.8 },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-900">{item.name}</span>
                  <div className="text-right text-sm">
                    <span className="text-slate-500">{formatNumber(item.impressions)}</span>
                    <span className="text-emerald-600 ml-3">{item.ctr}% CTR</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
