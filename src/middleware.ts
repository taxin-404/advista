import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as { role?: string } | undefined)?.role;

  const dashboardPaths = ["/dashboard", "/dashboard/"];
  const adminPaths = ["/admin", "/admin/"];
  const isDashboard = dashboardPaths.some((p) => pathname.startsWith(p));
  const isAdmin = adminPaths.some((p) => pathname.startsWith(p));

  if (isDashboard && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdmin && (!isLoggedIn || role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/checkout/:path*"],
};
