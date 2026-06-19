"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Menu, X, ShoppingCart, User, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";

const navLinks = [
  { href: "/ad-placements", label: "Ad Placements" },
  { href: "/pricing", label: "Pricing" },
  { href: "/media-kit", label: "Media Kit" },
  { href: "/how-it-works", label: "How It Works" },
];

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white">
              A
            </div>
            <span className="text-xl font-bold text-slate-900">AdVista</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-lg p-2 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{session.user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 z-20 w-48 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                      </Link>
                      {(session.user as { role?: string })?.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="h-4 w-4" /> Admin Panel
                        </Link>
                      )}
                      <hr className="my-1 border-slate-200" />
                      <button
                        onClick={() => signOut()}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-600"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-slate-200" />
            {!session?.user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <button
                onClick={() => signOut()}
                className="block w-full rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 text-left"
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
