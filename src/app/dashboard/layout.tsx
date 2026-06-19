"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Megaphone,
  BarChart3,
  ShoppingBag,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 bg-white">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                {session?.user?.name}
              </div>
              <div className="text-xs text-slate-500">Advertiser</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
          {(session?.user as any)?.role === "ADMIN" && (
            <>
              <hr className="my-3 border-slate-200" />
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <ChevronLeft className="h-5 w-5" />
                Admin Panel
              </Link>
            </>
          )}
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
