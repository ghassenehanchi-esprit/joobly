import mongoose from "mongoose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { PointsOrder } from "@/models/PointsOrder";
import { User } from "@/models/User";
import { getStripeClient } from "@/lib/stripe";

import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature header" },
      { status: 400 }
    );
  }

  const body = await req.text();

  const webhookSecret = process.env.STRIPE_SIGN_SECRET;

  if (!webhookSecret) {
    console.error("Stripe webhook secret is not configured");
    return NextResponse.json(
      { error: "Stripe webhook secret is not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripeClient();

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Failed to verify Stripe signature", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    console.error("Checkout session missing order metadata", session.id);
    return NextResponse.json({ error: "Missing order metadata" }, { status: 400 });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const order = await PointsOrder.findById(orderId);

    if (!order) {
      console.error("Order not found for Stripe session", orderId);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (session.payment_status === "paid" && !order.paid) {
      order.paid = true;
      await order.save();

      const updateResult = await User.findOneAndUpdate(
        { email: order.userEmail },
        { $inc: { jobPostPoints: order.points } },
        { new: true }
      );

      if (!updateResult) {
        console.error("Unable to update user points", order.userEmail);
        return NextResponse.json(
          { error: "Unable to update user points" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
