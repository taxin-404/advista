import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Megaphone, Plus, ArrowUpRight } from "lucide-react";

const statusColor: Record<string, "success" | "warning" | "destructive" | "default"> = {
  ACTIVE: "success",
  PENDING_REVIEW: "warning",
  DRAFT: "default",
  PAUSED: "warning",
  COMPLETED: "default",
  REJECTED: "destructive",
};

export default async function CampaignsPage() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return null;

  const campaigns = await prisma.campaign.findMany({
    where: { userId: user.id },
    include: { placement: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campaigns</h1>
          <p className="text-slate-500">Manage your advertising campaigns</p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Megaphone className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No campaigns yet</h3>
            <p className="text-slate-500 mb-6">
              Purchase a placement and create your first campaign to get started.
            </p>
            <Link href="/dashboard/campaigns/new">
              <Button>Create Campaign</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Campaign</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Placement</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Impressions</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Clicks</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Spend</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-slate-900">{c.title}</div>
                      <div className="text-xs text-slate-500">{formatDate(c.startDate)} - {formatDate(c.endDate)}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{c.placement.name}</td>
                    <td className="py-4 px-6">
                      <Badge variant={statusColor[c.status] || "default"}>
                        {c.status.replace(/_/g, " ")}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-right text-slate-600">{c.impressions.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-right text-slate-600">{c.clicks.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-right font-medium">{formatCurrency(Number(c.spend))}</td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/dashboard/campaigns/${c.id}`}
                        className="text-indigo-600 hover:text-indigo-500 text-sm font-medium inline-flex items-center"
                      >
                        View <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
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
