import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/placements/add-to-cart-button";
import { Check, Eye, MousePointerClick, Users, Calendar, ArrowLeft, Shield, BarChart3 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const durationOptions = [
  { label: "Daily", value: "DAILY" as const, key: "priceDaily", desc: "Best for short campaigns" },
  { label: "Weekly", value: "WEEKLY" as const, key: "priceWeekly", desc: "Great for testing" },
  {
    label: "Monthly",
    value: "MONTHLY" as const,
    key: "priceMonthly",
    desc: "Most popular",
    popular: true,
  },
  {
    label: "Yearly",
    value: "YEARLY" as const,
    key: "priceYearly",
    desc: "Best value",
    savings: "25% off",
  },
];

export default async function AdPlacementDetailPage({ params }: Props) {
  const { slug } = await params;
  const placement = await prisma.adPlacement.findUnique({ where: { slug } });

  if (!placement || !placement.isActive) notFound();

  return (
    <div>
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/ad-placements"
            className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Placements
          </Link>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="default">
                  {placement.category.replace(/_/g, " ")}
                </Badge>
                <span className="text-sm text-slate-400">{placement.location}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {placement.name}
              </h1>
              <p className="text-lg text-slate-500 mb-8">{placement.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <Eye className="h-5 w-5 text-indigo-600 mb-2" />
                  <div className="text-2xl font-bold text-slate-900">
                    {formatNumber(placement.impressionsEstimate || 0)}
                  </div>
                  <div className="text-sm text-slate-500">Est. Monthly Impressions</div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <Users className="h-5 w-5 text-indigo-600 mb-2" />
                  <div className="text-2xl font-bold text-slate-900">
                    {formatNumber(placement.trafficEstimate || 0)}
                  </div>
                  <div className="text-sm text-slate-500">Est. Monthly Visitors</div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Placement Specifications
                </h3>
                <dl className="space-y-3">
                  {[
                    { label: "Dimensions", value: placement.dimensions },
                    { label: "Location", value: placement.location },
                    { label: "File Format", value: "PNG, JPEG, GIF" },
                    { label: "Max File Size", value: "5 MB" },
                    { label: "Category", value: placement.category.replace(/_/g, " ") },
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                      <dt className="text-sm text-slate-500">{spec.label}</dt>
                      <dd className="text-sm font-medium text-slate-900">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div>
              <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-8 border border-indigo-200">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white/80 rounded-lg px-4 py-2 mb-3">
                    <Eye className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-600">
                      Preview: {placement.dimensions}
                    </span>
                  </div>
                  <div className="text-slate-400 text-sm">Ad preview visualization</div>
                </div>
              </div>

              <Card className="border-indigo-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Choose Your Duration
                  </h3>
                  <div className="space-y-3 mb-6">
                    {durationOptions.map((opt) => {
                      const price = Number(placement[opt.key as keyof typeof placement]);
                      return (
                        <div
                          key={opt.value}
                          className={`relative rounded-xl border-2 p-4 transition-all ${
                            opt.popular
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-slate-200 hover:border-indigo-200"
                          }`}
                        >
                          {opt.popular && (
                            <span className="absolute -top-2.5 right-4 bg-indigo-600 text-white text-xs font-medium px-3 py-0.5 rounded-full">
                              Most Popular
                            </span>
                          )}
                          {opt.savings && (
                            <span className="absolute -top-2.5 right-4 bg-emerald-500 text-white text-xs font-medium px-3 py-0.5 rounded-full">
                              {opt.savings}
                            </span>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                  opt.popular
                                    ? "border-indigo-600 bg-indigo-600"
                                    : "border-slate-300"
                                }`}
                              >
                                {opt.popular && <Check className="h-3 w-3 text-white" />}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">{opt.label}</div>
                                <div className="text-xs text-slate-500">{opt.desc}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-slate-900">
                                {formatCurrency(price)}
                              </div>
                              {opt.value === "YEARLY" && (
                                <div className="text-xs text-emerald-600">
                                  {formatCurrency(price / 12)}/mo
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <AddToCartButton placement={placement} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">What&apos;s Included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Guaranteed Impressions", desc: "Your ad displayed to real users" },
              { icon: MousePointerClick, title: "Click Tracking", desc: "Real-time click monitoring" },
              { icon: BarChart3, title: "Detailed Analytics", desc: "Full campaign performance dashboard" },
              { icon: Shield, title: "Brand Safety", desc: "Premium content environment" },
              { icon: Calendar, title: "Flexible Duration", desc: "Daily to yearly options" },
              { icon: Users, title: "Dedicated Support", desc: "Campaign management assistance" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
