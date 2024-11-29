const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { PointsOrder } from "@/models/PointsOrder";

export async function POST(req: Request) {
    const sig = req.headers.get('stripe-signature');
    let event;

    try {
        const reqBuffer = await req.text();
        const signSecret = process.env.STRIPE_SIGN_SECRET!;
        event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
    } catch (error) {
        console.error('stripe error');
        return new Response(JSON.stringify({ error: 'Invalid signature' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (event.type === 'checkout.session.completed') {
        console.log(event);
        const orderId = event?.data?.object?.metadata?.orderId;
        const isPaid = event?.data?.object?.payment_status === 'paid';
        if (isPaid) {
            await PointsOrder.updateOne({ _id: orderId }, { paid: true });
        }
    }

    return new Response(JSON.stringify({ message: 'ok' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}