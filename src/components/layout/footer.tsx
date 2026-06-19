import Link from "next/link";

const footerLinks = {
  Advertising: [
    { href: "/ad-placements", label: "Browse Placements" },
    { href: "/pricing", label: "Pricing" },
    { href: "/media-kit", label: "Media Kit" },
    { href: "/how-it-works", label: "How It Works" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
  ],
  Support: [
    { href: "/help", label: "Help Center" },
    { href: "/faq", label: "FAQ" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white">
                A
              </div>
              <span className="text-xl font-bold text-slate-900">AdVista</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs mb-6">
              Premium advertising marketplace connecting brands with high-quality
              audience traffic. Grow your business with targeted ad placements.
            </p>
            <div className="flex gap-3">
              {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-200 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors text-xs font-medium"
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} AdVista. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="flex h-5 w-8 items-center justify-center rounded bg-blue-600 text-[8px] font-bold text-white">
                  V
                </div>
                Verified Secure
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="flex h-5 w-8 items-center justify-center rounded bg-emerald-600 text-[8px] font-bold text-white">
                  S
                </div>
                SSL Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
