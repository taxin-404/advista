import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminPlacementsPage() {
  const placements = await prisma.adPlacement.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ad Placements</h1>
          <p className="text-slate-500">Manage advertising inventory</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Category</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Dimensions</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Monthly</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Yearly</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {placements.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{p.name}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{p.category.replace(/_/g, " ")}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{p.dimensions}</td>
                  <td className="py-4 px-6 text-sm text-right font-semibold">{formatCurrency(Number(p.priceMonthly))}</td>
                  <td className="py-4 px-6 text-sm text-right font-semibold">{formatCurrency(Number(p.priceYearly))}</td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={p.isActive ? "success" : "destructive"}>
                      {p.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
