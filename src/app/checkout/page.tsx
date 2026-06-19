"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Loader2, Lock, CreditCard, Shield } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-slate-50">
        <div className="text-center max-w-md">
          <Lock className="h-16 w-16 text-slate-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign in to checkout</h1>
          <p className="text-slate-500 mb-8">Please sign in or create an account to complete your purchase.</p>
          <Link href="/login?callbackUrl=/checkout">
            <Button size="lg">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-slate-50">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
          <Link href="/ad-placements">
            <Button>Browse Placements</Button>
          </Link>
        </div>
      </div>
    );
  }

  async function handleStripeCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            placementId: item.placementId,
            durationType: item.durationType,
            durationValue: item.durationValue,
            price: item.price,
            name: item.name,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h2>
                <div className="text-sm text-slate-600">
                  Logged in as <span className="font-medium text-slate-900">{session.user?.email}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <button
                    onClick={handleStripeCheckout}
                    disabled={loading}
                    className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50 hover:bg-indigo-100 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-indigo-600" />
                      <div className="text-left">
                        <div className="font-semibold text-slate-900">Pay with Card</div>
                        <div className="text-sm text-slate-500">Credit, debit, or Stripe</div>
                      </div>
                    </div>
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                    ) : (
                      <span className="text-sm font-medium text-indigo-600">Pay ${totalPrice}</span>
                    )}
                  </button>

                  <button
                    disabled
                    className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-200 bg-white opacity-50 cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-blue-600">P</div>
                      <div className="text-left">
                        <div className="font-semibold text-slate-900">PayPal</div>
                        <div className="text-sm text-slate-500">Coming soon</div>
                      </div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">{item.name}</span>
                      <span className="font-medium">{formatCurrency(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-200 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Shield className="h-3 w-3" />
                  <span>SSL Encrypted Payment</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
