import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { items } = await req.json();
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + Math.round(item.price * 100),
      0
    );

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: `${item.durationType} placement`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
