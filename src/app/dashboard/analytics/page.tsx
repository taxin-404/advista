"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Eye, MousePointerClick, TrendingUp, DollarSign } from "lucide-react";

interface AnalyticsData {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  campaigns: {
    id: string;
    title: string;
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
  }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch("/api/analytics/overview")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const avgCtr =
    data.totalImpressions > 0
      ? ((data.totalClicks / data.totalImpressions) * 100).toFixed(2)
      : "0.00";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500">Track your campaign performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Impressions", value: formatNumber(data.totalImpressions), icon: Eye },
          { label: "Clicks", value: formatNumber(data.totalClicks), icon: MousePointerClick },
          { label: "CTR", value: `${avgCtr}%`, icon: TrendingUp },
          { label: "Conversions", value: formatNumber(data.totalConversions), icon: DollarSign },
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

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {data.campaigns.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No campaign data available yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Campaign</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-900">Impressions</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-900">Clicks</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-900">CTR</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-900">Conversions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.campaigns.map((c) => (
                    <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-medium text-slate-900">{c.title}</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-600">{c.impressions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-600">{c.clicks.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-600">{c.ctr.toFixed(2)}%</td>
                      <td className="py-3 px-4 text-sm text-right text-slate-600">{c.conversions.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
