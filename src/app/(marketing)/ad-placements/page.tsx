import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

const categories = [
  { value: "ALL", label: "All Placements" },
  { value: "HOMEPAGE_BANNER", label: "Homepage Banners" },
  { value: "SIDEBAR", label: "Sidebar Ads" },
  { value: "HEADER", label: "Header Ads" },
  { value: "FOOTER", label: "Footer Ads" },
  { value: "SPONSORED_POST", label: "Sponsored Posts" },
  { value: "FEATURED_LISTING", label: "Featured Listings" },
];

interface Props {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function AdPlacementsPage({ searchParams }: Props) {
  const { category, search } = await searchParams;

  const where: any = { isActive: true };
  if (category && category !== "ALL") where.category = category;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const placements = await prisma.adPlacement.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });

  const categoryNames: Record<string, string> = {
    HOMEPAGE_BANNER: "Homepage Banner",
    SIDEBAR: "Sidebar",
    HEADER: "Header",
    FOOTER: "Footer",
    SPONSORED_POST: "Sponsored Post",
    FEATURED_LISTING: "Featured Listing",
  };

  return (
    <div>
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Ad Placements</h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Browse our premium advertising inventory. Filter by category, compare
            pricing, and choose the perfect placement for your campaign.
          </p>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <form>
                <input
                  name="search"
                  defaultValue={search}
                  placeholder="Search placements..."
                  className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </form>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => {
                const isActive = category === cat.value || (!category && cat.value === "ALL");
                const href = cat.value === "ALL" ? "/ad-placements" : `?category=${cat.value}`;
                return (
                  <Link
                    key={cat.value}
                    href={href}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {placements.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No placements found matching your criteria.</p>
              <Link href="/ad-placements">
                <Button variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placements.map((placement) => (
                <Link key={placement.id} href={`/ad-placements/${placement.slug}`}>
                  <Card className="h-full hover:border-indigo-200 hover:shadow-lg transition-all group">
                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-300">
                          {placement.dimensions}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {placement.category.replace(/_/g, " ")}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                          {categoryNames[placement.category] || placement.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {placement.location}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {placement.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                        {placement.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                          <div className="text-xs text-slate-500">Traffic</div>
                          <div className="text-sm font-semibold text-slate-900">
                            {formatNumber(placement.trafficEstimate || 0)}/mo
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                          <div className="text-xs text-slate-500">Impressions</div>
                          <div className="text-sm font-semibold text-slate-900">
                            {formatNumber(placement.impressionsEstimate || 0)}/mo
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                          <span className="text-2xl font-bold text-slate-900">
                            {formatCurrency(Number(placement.priceMonthly))}
                          </span>
                          <span className="text-sm text-slate-400"> /mo</span>
                        </div>
                        <div className="flex items-center text-sm text-indigo-600 font-medium">
                          View Details
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
