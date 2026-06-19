import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminAdvertisersPage() {
  const advertisers = await prisma.user.findMany({
    where: { role: "ADVERTISER" },
    include: { _count: { select: { campaigns: true, orders: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Advertisers</h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Email</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Company</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-900">Campaigns</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-900">Orders</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Joined</th>
              </tr>
            </thead>
            <tbody>
              {advertisers.map((a) => (
                <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{a.name}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{a.email}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{a.company || "-"}</td>
                  <td className="py-4 px-6 text-sm text-center">{a._count.campaigns}</td>
                  <td className="py-4 px-6 text-sm text-center">{a._count.orders}</td>
                  <td className="py-4 px-6 text-sm text-right text-slate-500">{formatDate(a.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
