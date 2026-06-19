import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";

const orderStatusColor: Record<string, "success" | "warning" | "destructive" | "default"> = {
  PAID: "success",
  APPROVED: "success",
  PENDING: "warning",
  COMPLETED: "default",
  CANCELLED: "destructive",
  REJECTED: "destructive",
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return null;

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { placement: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-500">Your advertising orders</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <ShoppingBag className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders yet</h3>
            <p className="text-slate-500">Browse ad placements to make your first purchase.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Placement</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Duration</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Amount</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100">
                    <td className="py-4 px-6 text-sm font-medium text-slate-900">
                      {order.placement.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {order.durationType.replace(/_/g, " ")}
                    </td>
                    <td className="py-4 px-6 text-sm text-right font-semibold">
                      {formatCurrency(Number(order.totalPrice))}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Badge variant={orderStatusColor[order.status] || "default"}>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
