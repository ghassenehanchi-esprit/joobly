import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { title, price } = await req.json();

    console.log(process.env.PAYPAL_API_URL);
    console.log(process.env.PAYPAL_CLIENT_ID);
    console.log(process.env.PAYPAL_CLIENT_SECRET);

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
    
    // Логируем весь ответ для диагностики
    if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`PayPal API Error: ${response.status} - ${errorDetails}`);
        return NextResponse.json({ error: "PayPal API error", details: errorDetails }, { status: 500 });
    }
    
    const data = await response.json();
    return NextResponse.json({ id: data.id });
}