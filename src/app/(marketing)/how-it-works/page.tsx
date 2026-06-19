import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ShoppingCart, Upload, BarChart3, ArrowRight, Check } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Placements",
    description:
      "Explore our marketplace of premium ad placements. Filter by category, compare pricing, and review traffic statistics to find the perfect spot for your campaign.",
    details: [
      "View detailed specs for each placement",
      "Compare daily, weekly, monthly & yearly pricing",
      "Review traffic and impression estimates",
      "Preview ad dimensions and locations",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Select & Checkout",
    description:
      "Add placements to your cart and choose your preferred duration. Secure checkout with Stripe or PayPal. No hidden fees or long-term commitments required.",
    details: [
      "Flexible duration options",
      "Stripe & PayPal accepted",
      "Instant payment processing",
      "No hidden fees",
    ],
  },
  {
    icon: Upload,
    title: "Upload Creative",
    description:
      "Submit your banner or ad creative through your dashboard. Our team reviews submissions within 24 hours to ensure they meet our quality guidelines.",
    details: [
      "Upload via advertiser dashboard",
      "Support for PNG, JPEG, GIF",
      "Max file size: 5MB",
      "24-hour review turnaround",
    ],
  },
  {
    icon: BarChart3,
    title: "Track Performance",
    description:
      "Monitor your campaign in real-time with our analytics dashboard. Track impressions, clicks, conversions, and ROI to optimize your advertising strategy.",
    details: [
      "Real-time impression & click tracking",
      "Conversion monitoring",
      "Detailed campaign analytics",
      "Export reports for your team",
    ],
  },
];

const faqs = [
  {
    q: "How quickly can I launch a campaign?",
    a: "Once you complete checkout and upload your creative, our team reviews and approves within 24 hours. Most campaigns go live within 12 hours.",
  },
  {
    q: "What ad formats do you accept?",
    a: "We accept PNG, JPEG, and GIF formats with a maximum file size of 5MB. Specific dimension requirements vary by placement and are listed on each placement page.",
  },
  {
    q: "Can I change my ad creative during a campaign?",
    a: "Yes! You can update your creative at any time through your dashboard. Changes go through a quick review process before going live.",
  },
  {
    q: "How is performance measured?",
    a: "We provide real-time tracking for impressions, clicks, and conversions. Our analytics dashboard gives you detailed insights into campaign performance.",
  },
  {
    q: "What if I'm not satisfied with the results?",
    a: "We offer a 7-day satisfaction guarantee. If your campaign doesn't meet expectations, we'll work with you to optimize or provide a refund.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Get your advertising campaign live in four simple steps.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, i) => (
              <div key={step.title} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <span className="text-6xl font-bold text-indigo-100">0{i + 1}</span>
                  <div className="flex items-center gap-4 mb-4 mt-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h2>
                  <p className="text-slate-500 mb-6 leading-relaxed">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 flex items-center justify-center">
                    <div className="text-center text-slate-400">
                      <step.icon className="h-16 w-16 mx-auto mb-3 text-indigo-300" />
                      <p className="text-sm font-medium text-indigo-400">{step.title} Illustration</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.q}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-xl mx-auto">
            Browse our marketplace and launch your first campaign today.
          </p>
          <Link href="/ad-placements">
            <Button size="xl" className="bg-white text-indigo-600 hover:bg-slate-100">
              Browse Placements
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
