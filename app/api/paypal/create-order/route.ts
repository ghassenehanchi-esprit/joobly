import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { title, price } = await req.json();

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
                        value: price.toFixed(2),
                    },
                },
            ],
        }),
    });

    const data = await response.json();
    return NextResponse.json({ id: data.id });
}