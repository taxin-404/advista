"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import toast from "react-hot-toast";

interface Placement {
  id: string;
  name: string;
  slug: string;
}

interface Order {
  id: string;
  placementId: string;
  totalPrice: number;
  status: string;
  placement: { name: string };
}

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState({
    title: "",
    targetUrl: "",
    altText: "",
    placementId: "",
    orderId: "",
  });

  useEffect(() => {
    fetch("/api/placements")
      .then((r) => r.json())
      .then(setPlacements);
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

  const availableOrders = orders.filter(
    (o) => o.status === "PAID" || o.status === "APPROVED"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.targetUrl || !form.placementId || !form.orderId) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create campaign");
      toast.success("Campaign created! Submit for review.");
      router.push("/dashboard/campaigns");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">New Campaign</h1>
      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Campaign Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Summer Campaign 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Target URL *
              </label>
              <input
                type="url"
                value={form.targetUrl}
                onChange={(e) => setForm({ ...form, targetUrl: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://yourwebsite.com/landing-page"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Alt Text
              </label>
              <input
                value={form.altText}
                onChange={(e) => setForm({ ...form, altText: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Descriptive text for your ad"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Select Placement *
              </label>
              <select
                value={form.placementId}
                onChange={(e) => setForm({ ...form, placementId: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose a placement...</option>
                {placements.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Link to Order *
              </label>
              <select
                value={form.orderId}
                onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose an order...</option>
                {availableOrders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.placement.name} - ${Number(o.totalPrice).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-600 mb-1">Upload Banner Creative</p>
              <p className="text-xs text-slate-400">PNG, JPEG, or GIF. Max 5MB.</p>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="flex-1 h-12">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create & Submit for Review
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="px-8"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
