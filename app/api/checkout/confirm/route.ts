import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { PointsOrder } from "@/models/PointsOrder";
import { User } from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { sessionId } = await req.json();

  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json(
      { error: "Missing Stripe session identifier" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: "Stripe session not found" },
        { status: 404 }
      );
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        {
          success: false,
          status: session.payment_status,
          message: "Payment has not been completed",
        },
        { status: 202 }
      );
    }

    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing order reference on Stripe session" },
        { status: 400 }
      );
    }

    await mongoose.connect(process.env.MONGODB_URI as string);

    const order = await PointsOrder.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (!order.paid) {
      order.paid = true;
      await order.save();

      const updatedUser = await User.findOneAndUpdate(
        { email: order.userEmail },
        { $inc: { jobPostPoints: order.points } },
        { new: true }
      );

      if (!updatedUser) {
        return NextResponse.json(
          { error: "Unable to update user points" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment confirmed",
      pointsAwarded: order.points,
    });
  } catch (error) {
    console.error("Failed to verify Stripe session", error);
    return NextResponse.json(
      { error: "Unable to verify payment status" },
      { status: 500 }
    );
  }
}
