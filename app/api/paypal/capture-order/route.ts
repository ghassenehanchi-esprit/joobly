import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { orderId } = await req.json();

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
        // Здесь можно обновить статус заказа в базе
        return NextResponse.json({ message: "Payment successful" });
    } else {
        return NextResponse.json({ message: "Payment not completed" }, { status: 400 });
    }
}