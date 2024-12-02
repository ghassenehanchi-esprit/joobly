import { authOptions } from "@/lib/authOptions";
import { PointsOrder } from "@/models/PointsOrder";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGODB_URI as string);

    const { title, price, points } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || undefined;


    if (!userEmail) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const orderDoc = await PointsOrder.create({
        userEmail,
        title,
        price,
        points,
        paymentType: "paypal",
        paid: false,
    });

    const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
                `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
            ).toString("base64")}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    description: title,
                    amount: {
                        currency_code: "CZK",
                        value: price.toFixed(2).toString(),
                    },
                },
            ],
        }),
    });
    
    // Diagnosis logs
    if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`PayPal API Error: ${response.status} - ${errorDetails}`);
        return NextResponse.json({ error: "PayPal API error", details: errorDetails }, { status: 500 });
    }
    
    const data = await response.json();
    return NextResponse.json({ id: data.id, orderId: orderDoc._id });
}