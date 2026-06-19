import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusColor: Record<string, "success" | "warning" | "destructive" | "default"> = {
  PAID: "success",
  APPROVED: "success",
  PENDING: "warning",
  COMPLETED: "default",
  CANCELLED: "destructive",
  REJECTED: "destructive",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true } },
      placement: { select: { name: true } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Orders</h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Placement</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Advertiser</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Date</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Amount</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{order.placement.name}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{order.user.name}</td>
                  <td className="py-4 px-6 text-sm text-slate-500">{formatDate(order.createdAt)}</td>
                  <td className="py-4 px-6 text-sm text-right font-semibold">{formatCurrency(Number(order.totalPrice))}</td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={statusColor[order.status] || "default"}>{order.status}</Badge>
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
