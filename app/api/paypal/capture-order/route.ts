import { PointsOrder } from "@/models/PointsOrder";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGODB_URI as string);
  
    const { orderId, dbOrderId } = await req.json();
  
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    });
  
    const data = await response.json();
  
    if (data.status === "COMPLETED") {
      // Order status changes
      const order = await PointsOrder.findByIdAndUpdate(
        dbOrderId,
        { paid: true },
        { new: true }
      );
  
      if (!order) {
        return NextResponse.json(
          { error: "Order not found for updating" },
          { status: 404 }
        );
      }
  
      // Adding points on customer account
      const user = await User.findOneAndUpdate(
        { email: order.userEmail },
        { $inc: { jobPostPoints: order.points } },
        { new: true }
      );
  
      if (!user) {
        return NextResponse.json(
          { error: "User not found for updating points" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ message: "Payment successful", user });
    } else {
      return NextResponse.json({ message: "Payment not completed" }, { status: 400 });
    }
  }