import { authOptions } from "@/lib/authOptions";
import { PointsOrder } from "@/models/PointsOrder";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const { title, price, points } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || undefined;

  const orderDoc = await PointsOrder.create({
    userEmail,
    title,
    price,
    points,
    paymentType: "stripe",
    paid: false, // Default to unpaid
  });

  const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "CZK",
        product_data: { name: title },
        unit_amount: price * 100,
      },
    },
  ];

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: userEmail,
      success_url: `${process.env.NEXTAUTH_URL}success`,
      cancel_url: `${process.env.NEXTAUTH_URL}packages`,
      metadata: { orderId: orderDoc._id.toString() }, // Attach order ID for webhook
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: unknown) {
    return NextResponse.json(
      { error, message: "Could not create checkout session" },
      { status: 500 }
    );
  }
}
