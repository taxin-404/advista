"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, Check } from "lucide-react";
import toast from "react-hot-toast";
import type { AdPlacement } from "@prisma/client";

interface Props {
  placement: AdPlacement;
}

export function AddToCartButton({ placement }: Props) {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setLoading(true);

    const item = {
      id: `${placement.id}-monthly`,
      placementId: placement.id,
      name: placement.name,
      slug: placement.slug,
      dimensions: placement.dimensions,
      durationType: "MONTHLY" as const,
      durationValue: 1,
      price: Number(placement.priceMonthly),
      imageUrl: placement.imageUrl,
    };

    addItem(item);
    setAdded(true);
    toast.success("Added to cart!");
    setLoading(false);

    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-3">
      <Button
        size="lg"
        className="w-full h-14 text-lg"
        onClick={handleAdd}
        disabled={loading || added}
      >
        {loading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : added ? (
          <Check className="mr-2 h-5 w-5" />
        ) : (
          <ShoppingCart className="mr-2 h-5 w-5" />
        )}
        {added ? "Added to Cart" : `Add to Cart - $${Number(placement.priceMonthly).toLocaleString()}/mo`}
      </Button>
      <p className="text-xs text-slate-400 text-center">
        Secure checkout with Stripe &bull; PayPal accepted
      </p>
    </div>
  );
}
