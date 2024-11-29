import { authOptions } from "@/lib/authOptions";
import { PointsOrder } from "@/models/PointsOrder";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const { title, price, points } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || undefined; 

  const orderDoc = await PointsOrder.create({
    userEmail,
    title,
    price,
    points,
    paymentType: "stripe",
    paid: false,
  });

  const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "CZK",
        product_data: {
          name: title,
        },
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
      metadata: { orderId: orderDoc._id.toString() },
      payment_intent_data: {
        metadata: { orderId: orderDoc._id.toString() },
      },
    });

    // Add points to user jobPoints
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail }, // Find user with email
      { $inc: { jobPostPoints: points } }, // Increase -> jobPostPoints + points
      { new: true } // Return updated doc
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found for updating points" },
        { status: 404 }
      );
    }

    // Mark the order as paid
    const updatedOrder = await PointsOrder.findByIdAndUpdate(
      orderDoc._id,
      { paid: true },
      { new: true } // Return updated doc
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: "Order not found for marking as paid" },
        { status: 404 }
      );
    }

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error, message: "Could not create checkout session" },
      { status: 500 }
    );
  }
}