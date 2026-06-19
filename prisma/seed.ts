import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@advista.com" },
    update: {},
    create: {
      email: "admin@advista.com",
      passwordHash,
      name: "Admin",
      company: "AdVista",
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  const placements = [
    {
      name: "Homepage Hero Banner",
      slug: "homepage-hero-banner",
      category: "HOMEPAGE_BANNER",
      description:
        "Premium full-width banner placement at the top of our homepage. Maximum visibility with every visitor. Perfect for brand awareness campaigns and product launches.",
      dimensions: "1920×400",
      location: "Homepage - Top (Above Fold)",
      imageUrl: "/images/placements/hero-banner.jpg",
      trafficEstimate: 500000,
      impressionsEstimate: 250000,
      priceDaily: 150,
      priceWeekly: 875,
      priceMonthly: 2500,
      priceYearly: 22500,
      sortOrder: 1,
    },
    {
      name: "Sidebar Rectangle",
      slug: "sidebar-rectangle",
      category: "SIDEBAR",
      description:
        "Standard 300×250 rectangle ad appearing on all interior pages. Consistent visibility across the entire site. Great for retargeting and direct response campaigns.",
      dimensions: "300×250",
      location: "All Pages - Right Sidebar",
      imageUrl: "/images/placements/sidebar.jpg",
      trafficEstimate: 300000,
      impressionsEstimate: 150000,
      priceDaily: 50,
      priceWeekly: 275,
      priceMonthly: 800,
      priceYearly: 7200,
      sortOrder: 2,
    },
    {
      name: "Header Leaderboard",
      slug: "header-leaderboard",
      category: "HEADER",
      description:
        "Wide leaderboard banner in the site header, visible on every page load. High-frequency placement ideal for branding campaigns and announcements.",
      dimensions: "728×90",
      location: "All Pages - Header",
      imageUrl: "/images/placements/header.jpg",
      trafficEstimate: 600000,
      impressionsEstimate: 300000,
      priceDaily: 80,
      priceWeekly: 450,
      priceMonthly: 1200,
      priceYearly: 10800,
      sortOrder: 3,
    },
    {
      name: "Footer Banner",
      slug: "footer-banner",
      category: "FOOTER",
      description:
        "Large footer banner at the bottom of every page. Captures engaged visitors who have scrolled through content. Cost-effective high-impression placement.",
      dimensions: "970×250",
      location: "All Pages - Footer",
      imageUrl: "/images/placements/footer.jpg",
      trafficEstimate: 400000,
      impressionsEstimate: 200000,
      priceDaily: 40,
      priceWeekly: 225,
      priceMonthly: 600,
      priceYearly: 5400,
      sortOrder: 4,
    },
    {
      name: "Sponsored Post",
      slug: "sponsored-post",
      category: "SPONSORED_POST",
      description:
        "Native editorial content published in our blog section. Includes writer collaboration, SEO optimization, and social media promotion. Highest engagement rates.",
      dimensions: "N/A (Native Content)",
      location: "Blog Section - Sponsored",
      imageUrl: "/images/placements/sponsored.jpg",
      trafficEstimate: 200000,
      impressionsEstimate: 100000,
      priceDaily: 200,
      priceWeekly: 1100,
      priceMonthly: 3500,
      priceYearly: 31500,
      sortOrder: 5,
    },
    {
      name: "Featured Listing",
      slug: "featured-listing",
      category: "FEATURED_LISTING",
      description:
        "Premium highlighted listing in our directory page with enhanced styling, priority positioning, and direct call-to-action buttons. Stand out from competitors.",
      dimensions: "600×200",
      location: "Directory Page - Featured Section",
      imageUrl: "/images/placements/featured.jpg",
      trafficEstimate: 150000,
      impressionsEstimate: 80000,
      priceDaily: 100,
      priceWeekly: 550,
      priceMonthly: 1800,
      priceYearly: 16200,
      sortOrder: 6,
    },
  ];

  for (const placement of placements) {
    await prisma.adPlacement.upsert({
      where: { slug: placement.slug },
      update: {},
      create: placement,
    });
  }

  console.log("Seed complete: admin user + 6 placements created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
