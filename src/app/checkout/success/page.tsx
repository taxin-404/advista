"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, LayoutDashboard } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-slate-50">
      <div className="text-center max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
        <p className="text-slate-500 mb-8">
          Your order has been confirmed. You can now set up your campaign and
          upload your creative from your dashboard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard/campaigns/new">
            <Button size="lg">
              Set Up Campaign
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
