import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/layout/session-provider";
import { CartProvider } from "@/context/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AdVista - Premium Advertising Marketplace",
    template: "%s | AdVista",
  },
  description:
    "Premium advertising marketplace connecting brands with high-quality audience traffic. Browse ad placements, view pricing, and launch campaigns.",
  keywords: [
    "advertising",
    "ad marketplace",
    "buy ad space",
    "digital advertising",
    "sponsored posts",
    "banner ads",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <SessionProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: "12px",
                  background: "#1e293b",
                  color: "#fff",
                },
              }}
            />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
