import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Download, TrendingUp, Users, Globe, Smartphone, BarChart3, Eye } from "lucide-react";

const siteStats = {
  uniqueVisitors: 500000,
  pageViews: 2500000,
  avgSessionDuration: 245,
  bounceRate: 32,
  monthlyGrowth: 15,
  demographics: {
    age: [
      { label: "18-24", value: 15 },
      { label: "25-34", value: 35 },
      { label: "35-44", value: 28 },
      { label: "45-54", value: 15 },
      { label: "55+", value: 7 },
    ],
    gender: [
      { label: "Male", value: 62 },
      { label: "Female", value: 38 },
    ],
    device: [
      { label: "Desktop", value: 45 },
      { label: "Mobile", value: 42 },
      { label: "Tablet", value: 13 },
    ],
    geo: [
      { label: "United States", value: 40 },
      { label: "United Kingdom", value: 12 },
      { label: "Canada", value: 8 },
      { label: "Germany", value: 6 },
      { label: "Australia", value: 5 },
      { label: "Other", value: 29 },
    ],
  },
};

export default async function MediaKitPage() {
  const placements = await prisma.adPlacement.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div>
              <Badge variant="default" className="mb-4">Media Kit</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Advertising & Audience Overview
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl">
                Reach a highly engaged audience of tech professionals, entrepreneurs,
                and decision-makers. Our platform delivers premium visibility for
                your brand.
              </p>
            </div>
            <Button size="lg" className="shrink-0">
              <Download className="mr-2 h-4 w-4" />
              Download PDF Media Kit
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-6 w-6 text-indigo-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {formatNumber(siteStats.uniqueVisitors)}
                </div>
                <div className="text-sm text-slate-500">Monthly Unique Visitors</div>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-emerald-600">
                  <TrendingUp className="h-3 w-3" /> +{siteStats.monthlyGrowth}% MoM
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Eye className="h-6 w-6 text-indigo-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {formatNumber(siteStats.pageViews)}
                </div>
                <div className="text-sm text-slate-500">Monthly Page Views</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-6 w-6 text-indigo-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {Math.floor(siteStats.avgSessionDuration / 60)}m {siteStats.avgSessionDuration % 60}s
                </div>
                <div className="text-sm text-slate-500">Avg. Session Duration</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-6 w-6 text-indigo-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {siteStats.bounceRate}%
                </div>
                <div className="text-sm text-slate-500">Bounce Rate</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Age Demographics</h3>
                <div className="space-y-4">
                  {siteStats.demographics.age.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="font-semibold text-slate-900">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Geographic Distribution</h3>
                <div className="space-y-4">
                  {siteStats.demographics.geo.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="font-semibold text-slate-900">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  <Smartphone className="inline h-5 w-5 mr-2 text-indigo-600" />
                  Device Breakdown
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {siteStats.demographics.device.map((item) => (
                    <div key={item.label} className="text-center p-4 bg-slate-50 rounded-xl">
                      <div className="text-2xl font-bold text-slate-900 mb-1">{item.value}%</div>
                      <div className="text-xs text-slate-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  <Users className="inline h-5 w-5 mr-2 text-indigo-600" />
                  Gender Split
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {siteStats.demographics.gender.map((item) => (
                    <div key={item.label} className="text-center p-4 bg-slate-50 rounded-xl">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">{item.value}%</div>
                      <div className="text-xs text-slate-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Available Advertising Opportunities</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-900">Placement</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-900">Dimensions</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-900">Location</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-slate-900">Monthly</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-slate-900">Yearly</th>
                </tr>
              </thead>
              <tbody>
                {placements.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-white transition-colors">
                    <td className="py-4 px-4">
                      <Link href={`/ad-placements/${p.slug}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        {p.name}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">{p.dimensions}</td>
                    <td className="py-4 px-4 text-sm text-slate-600">{p.location}</td>
                    <td className="py-4 px-4 text-sm font-semibold text-right">${Number(p.priceMonthly).toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm font-semibold text-right">${Number(p.priceYearly).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Advertise?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-xl mx-auto">
            Get in touch with our advertising team for a customized proposal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="xl" className="bg-white text-indigo-600 hover:bg-slate-100">
                Get Started
              </Button>
            </Link>
            <Link href="/ad-placements">
              <Button size="xl" variant="outline" className="border-indigo-300 text-white hover:bg-indigo-500">
                Browse Placements
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
