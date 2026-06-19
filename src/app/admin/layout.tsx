"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Image,
  Users,
  ShoppingBag,
  CheckSquare,
  CreditCard,
  BarChart3,
  ArrowLeft,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/placements", label: "Placements", icon: Image },
  { href: "/admin/advertisers", label: "Advertisers", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 bg-white">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-sm font-bold text-white">
              A
            </div>
            <span className="text-lg font-bold text-slate-900">Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-amber-50 text-amber-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
          <hr className="my-3 border-slate-200" />
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
