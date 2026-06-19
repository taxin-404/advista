import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true } },
      order: { include: { placement: { select: { name: true } } } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Payments</h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Advertiser</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Placement</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Method</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">
                    No payments yet
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-6 text-sm text-slate-500 font-mono">#{p.id.slice(0, 8)}</td>
                    <td className="py-4 px-6 text-sm text-slate-900">{p.user.name}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{p.order.placement.name}</td>
                    <td className="py-4 px-6 text-sm text-right font-semibold">{formatCurrency(Number(p.amount))}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{p.method}</td>
                    <td className="py-4 px-6 text-center">
                      <Badge variant={p.status === "succeeded" ? "success" : p.status === "pending" ? "warning" : "destructive"}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-right text-slate-500">{formatDate(p.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
