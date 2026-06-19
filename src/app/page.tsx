import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  Target,
  BarChart3,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  Star,
  ArrowUpRight,
  Play,
} from "lucide-react";

const stats = [
  { value: "500K+", label: "Monthly Visitors" },
  { value: "2.5M+", label: "Monthly Impressions" },
  { value: "98%", label: "Ad Delivery Rate" },
  { value: "4.8/5", label: "Advertiser Rating" },
];

const benefits = [
  {
    icon: Target,
    title: "Targeted Audience",
    description:
      "Reach a highly engaged audience of tech professionals, entrepreneurs, and decision-makers actively seeking solutions.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track impressions, clicks, and conversions with our detailed analytics dashboard. Optimize campaigns in real-time.",
  },
  {
    icon: Zap,
    title: "Quick Setup",
    description:
      "Get your campaign live within 24 hours. Upload your creative, set your budget, and start reaching your audience.",
  },
  {
    icon: Shield,
    title: "Brand Safe",
    description:
      "Your ads appear alongside premium content in a trusted environment. Full control over placement and targeting.",
  },
  {
    icon: TrendingUp,
    title: "Proven ROI",
    description:
      "Our advertisers see an average 3.5x ROI. Premium placement with measurable results and dedicated support.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Connect with audiences across 150+ countries. Multi-format support including display, native, and sponsored content.",
  },
];

const steps = [
  {
    step: "01",
    title: "Choose Your Placement",
    description: "Browse our marketplace and select the ad placement that matches your campaign goals.",
  },
  {
    step: "02",
    title: "Select Duration & Pay",
    description: "Choose daily, weekly, monthly, or yearly pricing. Secure checkout with Stripe or PayPal.",
  },
  {
    step: "03",
    title: "Upload Your Creative",
    description: "Submit your banner or ad creative. Our team reviews and approves within 24 hours.",
  },
  {
    step: "04",
    title: "Track & Optimize",
    description: "Monitor campaign performance in real-time. Use analytics to optimize and maximize ROI.",
  },
];

const testimonials = [
  {
    quote:
      "AdVista transformed our customer acquisition strategy. The targeted placements delivered a 4.2x ROI in the first month alone.",
    author: "Sarah Chen",
    role: "Marketing Director, TechFlow",
  },
  {
    quote:
      "The analytics dashboard is incredibly detailed. We can see exactly which placements drive the most conversions and adjust accordingly.",
    author: "Marcus Johnson",
    role: "Growth Lead, SaaSly",
  },
  {
    quote:
      "Setting up our first campaign took less than 30 minutes. The approval process was fast and the support team was extremely helpful.",
    author: "Emily Rodriguez",
    role: "Founder, LaunchPad",
  },
];

async function getFeaturedPlacements() {
  return prisma.adPlacement.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });
}

export default async function HomePage() {
  const placements = await getFeaturedPlacements();

  return (
    <div>
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-200 mb-8">
              <Star className="mr-2 h-4 w-4 text-amber-400" />
              Trusted by 500+ advertisers worldwide
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
              Premium Advertising Space for{" "}
              <span className="gradient-text">High-Impact Campaigns</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Reach your target audience with precision-targeted ad placements.
              Browse our marketplace, choose your spot, and launch campaigns
              that deliver measurable results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/ad-placements">
                <Button size="xl" className="w-full sm:w-auto">
                  Browse Placements
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto border-slate-500 text-slate-200 hover:bg-slate-800"
                >
                  <Play className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 text-center backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Advertise With Us?
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              We provide the tools, reach, and insights you need to run
              successful advertising campaigns.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all"
              >
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 mb-5">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Featured Placements
              </h2>
              <p className="text-lg text-slate-500">
                Premium advertising spots with guaranteed visibility.
              </p>
            </div>
            <Link href="/ad-placements">
              <Button variant="outline" className="hidden sm:flex">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placements.map((placement) => (
              <Link key={placement.id} href={`/ad-placements/${placement.slug}`}>
                <Card className="h-full hover:border-indigo-200 hover:shadow-lg transition-all group">
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-xl flex items-center justify-center">
                    <span className="text-slate-400 text-sm font-medium">
                      {placement.dimensions}
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                        {placement.category.replace(/_/g, " ")}
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
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-2xl font-bold text-slate-900">
                          {formatCurrency(Number(placement.priceMonthly))}
                        </span>
                        <span className="text-sm text-slate-400"> /mo</span>
                      </div>
                      <span className="text-sm text-slate-400">
                        {placement.impressionsEstimate?.toLocaleString()} impressions/mo
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/ad-placements">
              <Button variant="outline">View All Placements</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Get your campaign live in four simple steps.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-indigo-200" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white text-xl font-bold mb-6 relative">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What Our Advertisers Say
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Join hundreds of businesses that have grown with AdVista.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.author} className="border-slate-200">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold text-sm">
                      {t.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {t.author}
                      </div>
                      <div className="text-xs text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Launch Your Campaign?
              </h2>
              <p className="text-lg text-indigo-100 mb-8 max-w-xl mx-auto">
                Join 500+ advertisers and start reaching your target audience
                today. First placement setup is on us.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="xl"
                    className="bg-white text-indigo-600 hover:bg-slate-100 shadow-lg"
                  >
                    Get Started Free
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/media-kit">
                  <Button
                    size="xl"
                    variant="outline"
                    className="border-indigo-300 text-white hover:bg-indigo-500"
                  >
                    Download Media Kit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
