import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

const envMode = process.env.NEXT_PUBLIC_ENV_MODE;

export async function POST(req: Request) {
	const body = await req.json();

	const successUrl =
		envMode === "development" ? "http://localhost:3000/success" : "https://www.joobly.cz/success";

	try {
		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			line_items: [
				{
					price_data: {
						currency: "czk",
						product_data: {
							name: body.title,
						},
						unit_amount: body.price * 100,
					},
					quantity: 1,
				},
			],
			success_url: successUrl,
		});
		return NextResponse.json({ session });
	} catch (error: unknown) {
		return NextResponse.json(
			{ error: error, message: "Could not create checkout session" },
			{ status: 500 },
		);
	}
}
