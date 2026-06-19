import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, MousePointerClick, Target, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const statusColor: Record<string, "success" | "warning" | "destructive" | "default"> = {
  ACTIVE: "success",
  PENDING_REVIEW: "warning",
  DRAFT: "default",
  PAUSED: "warning",
  COMPLETED: "default",
  REJECTED: "destructive",
};

export default async function CampaignDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.email) return null;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { placement: true, dailyStats: { orderBy: { date: "asc" } } },
  });

  if (!campaign || campaign.userId !== (session.user as { id?: string }).id && (session.user as { role?: string }).role !== "ADMIN") {
    notFound();
  }

  const ctr = campaign.impressions > 0
    ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2)
    : "0.00";

  return (
    <div>
      <Link
        href="/dashboard/campaigns"
        className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Campaigns
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{campaign.title}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-slate-500">{campaign.placement.name}</span>
            <Badge variant={statusColor[campaign.status] || "default"}>
              {campaign.status.replace(/_/g, " ")}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={campaign.targetUrl} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-1 h-4 w-4" /> Visit URL
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Impressions", value: campaign.impressions.toLocaleString(), icon: Eye },
          { label: "Clicks", value: campaign.clicks.toLocaleString(), icon: MousePointerClick },
          { label: "CTR", value: `${ctr}%`, icon: Target },
          { label: "Spend", value: formatCurrency(Number(campaign.spend)), icon: DollarSign },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500">{stat.label}</span>
                <stat.icon className="h-4 w-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Placement", value: campaign.placement.name },
              { label: "Target URL", value: campaign.targetUrl },
              { label: "Start Date", value: formatDate(campaign.startDate) },
              { label: "End Date", value: formatDate(campaign.endDate) },
              { label: "Duration", value: `${Math.ceil((campaign.endDate.getTime() - campaign.startDate.getTime()) / (1000 * 60 * 60 * 24))} days` },
              { label: "Banner", value: campaign.bannerUrl ? "Uploaded" : "Not uploaded" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                <dt className="text-sm text-slate-500">{item.label}</dt>
                <dd className="text-sm font-medium text-slate-900">{item.value}</dd>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Daily Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {campaign.dailyStats.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">
                No data yet. Stats will appear once the campaign is active.
              </p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {campaign.dailyStats.map((stat) => (
                  <div key={stat.id} className="flex justify-between text-sm py-2 border-b border-slate-100">
                    <span className="text-slate-500">{formatDate(stat.date)}</span>
                    <div className="flex gap-4">
                      <span>{stat.impressions} imp.</span>
                      <span>{stat.clicks} cl.</span>
                      <span className="font-medium">{stat.conversions} conv.</span>
                    </div>
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

function DollarSign(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
