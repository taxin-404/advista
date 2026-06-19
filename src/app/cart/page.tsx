"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="h-16 w-16 text-slate-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
          <p className="text-slate-500 mb-8">
            Browse our marketplace and add some ad placements to get started.
          </p>
          <Link href="/ad-placements">
            <Button size="lg">
              Browse Placements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
            <p className="text-slate-500 mt-1">{items.length} item{items.length > 1 ? "s" : ""} in your cart</p>
          </div>
          <Link href="/ad-placements">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/ad-placements/${item.slug}`}
                        className="text-lg font-semibold text-slate-900 hover:text-indigo-600"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <span>{item.dimensions}</span>
                        <span>
                          {item.durationType.charAt(0) + item.durationType.slice(1).toLowerCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-bold text-slate-900">
                        {formatCurrency(item.price)}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-500 hover:text-red-700 mt-2 inline-flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium text-slate-900">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Tax</span>
                    <span className="text-slate-400">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="font-bold text-xl text-slate-900">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="w-full h-12" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-3 mt-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="text-blue-600 font-bold">V</span> Secure
                  </span>
                  <span>SSL Encrypted</span>
                  <span>Stripe & PayPal</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
