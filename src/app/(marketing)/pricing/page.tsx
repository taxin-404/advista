import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for testing the waters",
    price: 599,
    popular: false,
    features: [
      "1 ad placement",
      "Monthly billing",
      "Basic analytics",
      "Email support",
      "Standard review time",
    ],
  },
  {
    name: "Growth",
    desc: "For growing businesses",
    price: 1499,
    popular: true,
    features: [
      "Up to 3 ad placements",
      "Monthly or quarterly billing",
      "Advanced analytics dashboard",
      "Priority email support",
      "Fast-track review (12h)",
      "Banner creative assistance",
    ],
  },
  {
    name: "Enterprise",
    desc: "For large-scale campaigns",
    price: 3999,
    popular: false,
    features: [
      "Unlimited placements",
      "Flexible billing terms",
      "Real-time analytics + API",
      "Dedicated account manager",
      "Instant approval",
      "Custom creative production",
      "Sponsored content collaboration",
    ],
  },
];

export default function PricingPage() {
  return (
    <div>
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Choose the plan that fits your advertising goals. All plans include
            access to our full placement marketplace.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.popular
                    ? "border-indigo-500 shadow-xl scale-105 md:scale-105"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-500">{plan.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">
                    ${plan.price.toLocaleString()}
                  </span>
                  <span className="text-slate-400">/mo</span>
                </div>
                <Link href="/register">
                  <Button
                    className={`w-full h-12 mb-8 ${
                      plan.popular ? "" : "variant-outline border-indigo-600 text-indigo-600"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
              Individual Placement Pricing
            </h2>
            <p className="text-center text-slate-500 mb-8">
              Prefer to purchase placements individually? Browse our marketplace
              for pay-per-placement pricing with daily, weekly, monthly, and
              yearly options.
            </p>
            <div className="text-center">
              <Link href="/ad-placements">
                <Button size="lg">Browse Individual Placements</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
