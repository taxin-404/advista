# AdVista — Premium Advertising Marketplace

A modern e-commerce platform where businesses can purchase advertising space. Built with Next.js 16, React, Tailwind CSS, Prisma, and PostgreSQL.

## Features

- **Ad Placement Marketplace** — Browse categories (Homepage Banner, Sidebar, Header, Footer, Sponsored Posts, Featured Listings)
- **Detailed Placement Pages** — Dimensions, location, traffic stats, impressions, pricing (daily/weekly/monthly/yearly)
- **User Authentication** — Email/password + Google OAuth via NextAuth.js
- **Shopping Cart & Checkout** — Stripe payment integration
- **Advertiser Dashboard** — Campaign management, banner uploads, performance tracking
- **Real-time Analytics** — Impressions, clicks, CTR, conversions tracking
- **Media Kit** — Traffic stats, audience demographics, advertising opportunities
- **Admin Panel** — Manage placements, advertisers, orders, approval workflow, payments, reports
- **Ad Approval Workflow** — Submit → Pending Review → Approve/Reject
- **Responsive Design** — Desktop, tablet, mobile optimized

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | React framework |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Styling |
| **Prisma 5** | Database ORM |
| **PostgreSQL** (Supabase) | Database |
| **NextAuth.js** | Authentication |
| **Stripe** | Payment processing |
| **Supabase Storage** | Banner creative uploads |
| **Resend** | Transactional emails |

## Prerequisites

- Node.js 18+
- npm
- A Supabase project (free tier works)
- Stripe account (free to create)
- Google OAuth credentials (free)

## Setup

### 1. Clone and install

```bash
git clone <repository-url> advista
cd advista
npm install
```

### 2. Configure environment variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:

| Variable | Description | Where to get it |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Supabase → Project Settings → Database |
| `AUTH_SECRET` | NextAuth encryption secret | Run `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Google Cloud Console |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Stripe Dashboard |
| `STRIPE_SECRET_KEY` | Stripe secret key | Stripe Dashboard |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase → Project Settings → API |
| `NEXT_PUBLIC_BASE_URL` | Your app URL | `http://localhost:3000` for development |

### 3. Set up the database

```bash
# Push the Prisma schema to your Supabase database
npx prisma db push

# Seed with sample data (6 ad placements + admin user)
npx prisma db seed
```

### 4. Start development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Default Admin Account

After seeding, you can sign in with:
- **Email:** `admin@advista.com`
- **Password:** `admin123`

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, Register, Forgot Password
│   ├── (marketing)/     # Homepage, Placements, Pricing, Media Kit, How It Works
│   ├── cart/            # Shopping cart
│   ├── checkout/        # Checkout + success page
│   ├── dashboard/       # Advertiser dashboard (protected)
│   ├── admin/           # Admin panel (protected, admin role)
│   └── api/             # API routes
├── components/
│   ├── ui/              # Button, Card, Badge
│   ├── layout/          # Header, Footer, SessionProvider
│   ├── marketing/       # Marketing page components
│   ├── placements/      # AddToCartButton, etc.
│   ├── dashboard/       # Dashboard components
│   └── admin/           # Admin components
├── context/             # Cart context
├── lib/                 # Prisma, Auth, Stripe, Utilities
├── hooks/               # React hooks
├── types/               # TypeScript types
└── middleware.ts        # Route protection
```

## API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handlers |
| `/api/auth/register` | POST | Create new account |
| `/api/placements` | GET | List active placements |
| `/api/placements/[slug]` | GET | Single placement detail |
| `/api/orders` | GET | User's orders |
| `/api/campaigns` | GET, POST | User's campaigns |
| `/api/checkout/stripe` | POST | Create Stripe checkout session |
| `/api/analytics/overview` | GET | Campaign analytics |
| `/api/admin/approvals/[id]` | POST | Approve/reject campaign |

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm start           # Start production server
npm run lint        # Run ESLint
npx prisma db push  # Push schema to database
npx prisma db seed  # Seed database
npx prisma studio   # Open Prisma Studio (DB browser)
```

## Deployment

Deploy to Vercel:

```bash
npm i -g vercel
vercel
```

Set all environment variables in the Vercel dashboard under Project Settings → Environment Variables.

## License

MIT
