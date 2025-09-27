import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { PACKAGES } from "@/lib/constant/constants";
import { PointsOrder } from "@/models/PointsOrder";
import { getStripeClient } from "@/lib/stripe";

import Stripe from "stripe";

const resolveAbsoluteUrl = (path: string) => {
  const configuredBaseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXTAUTH_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
    "http://localhost:3000";

  const normalisedBaseUrl = configuredBaseUrl.startsWith("http")
    ? configuredBaseUrl
    : `https://${configuredBaseUrl}`;

  return new URL(path, normalisedBaseUrl).toString();
};

export async function POST(req: Request) {
  let stripe: Stripe;

  try {
    stripe = getStripeClient();
  } catch (error) {
    console.error("Stripe configuration error", error);
    const message =
      error instanceof Error
        ? error.message
        : "Stripe could not be initialised";

    return NextResponse.json({ error: message }, { status: 500 });
  }

  const { title } = await req.json();

  if (!title) {
    return NextResponse.json(
      { error: "Missing package title" },
      { status: 400 }
    );
  }

  const packageDetails = PACKAGES.find((pkg) => pkg.title === title);

  if (!packageDetails || typeof packageDetails.price !== "number") {
    return NextResponse.json(
      { error: "Selected package is not available" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || undefined;

  if (!userEmail) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "CZK",
        product_data: { name: packageDetails.title },
        unit_amount: Math.round(packageDetails.price * 100),
      },
    },
  ];

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const orderDoc = await PointsOrder.create({
      userEmail,
      title: packageDetails.title,
      price: packageDetails.price,
      points: packageDetails.points,
      paymentType: "stripe",
      paid: false, // Default to unpaid
    });

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: userEmail,
      success_url: resolveAbsoluteUrl(
        "/success?session_id={CHECKOUT_SESSION_ID}"
      ),
      cancel_url: resolveAbsoluteUrl("/error"),
      metadata: {
        orderId: orderDoc._id.toString(),
        points: packageDetails.points.toString(),
      },
    });

    if (!stripeSession.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: unknown) {
    console.error("Stripe checkout session creation failed", error);

    const message =
      error instanceof Error
        ? error.message
        : "Could not create checkout session";

    return NextResponse.json({ error: message }, { status: 500 });

  }
}
