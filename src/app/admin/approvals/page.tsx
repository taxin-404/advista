import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import Link from "next/link";

export default async function AdminApprovalsPage() {
  const pending = await prisma.campaign.findMany({
    where: { status: "PENDING_REVIEW" },
    include: {
      user: { select: { name: true, email: true } },
      placement: { select: { name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  const recentReviews = await prisma.campaign.findMany({
    where: { status: { in: ["ACTIVE", "REJECTED"] } },
    include: {
      user: { select: { name: true } },
      placement: { select: { name: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 10,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Campaign Approvals</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Pending Review
              {pending.length > 0 && (
                <Badge variant="warning">{pending.length}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pending.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">
                No pending approvals
              </p>
            ) : (
              <div className="space-y-4">
                {pending.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border border-slate-200 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-900">{campaign.title}</h4>
                        <p className="text-sm text-slate-500">
                          {campaign.user.name} &bull; {campaign.placement.name}
                        </p>
                      </div>
                      <Badge variant="warning">Pending</Badge>
                    </div>
                    <div className="flex gap-2">
                      <form
                        action={`/api/admin/approvals/${campaign.id}`}
                        method="POST"
                      >
                        <input type="hidden" name="action" value="APPROVED" />
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          <CheckCircle className="mr-1 h-4 w-4" /> Approve
                        </Button>
                      </form>
                      <form
                        action={`/api/admin/approvals/${campaign.id}`}
                        method="POST"
                      >
                        <input type="hidden" name="action" value="REJECTED" />
                        <Button size="sm" variant="destructive">
                          <XCircle className="mr-1 h-4 w-4" /> Reject
                        </Button>
                      </form>
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                      >
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-4 w-4" /> View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {recentReviews.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">
                No reviewed campaigns yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentReviews.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between py-2 border-b border-slate-100"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900">{c.title}</div>
                      <div className="text-xs text-slate-500">{c.user.name}</div>
                    </div>
                    <Badge
                      variant={c.status === "ACTIVE" ? "success" : "destructive"}
                    >
                      {c.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
