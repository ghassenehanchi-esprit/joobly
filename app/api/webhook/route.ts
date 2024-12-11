const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { PointsOrder } from "@/models/PointsOrder";
import { User } from "@/models/User";
import mongoose from "mongoose";

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
                await mongoose.connect(process.env.MONGODB_URI as string);
                const orderPaid = await PointsOrder.updateOne({ _id: orderId }, { paid: true });
                const order = await PointsOrder.findById(orderId);
    
                if (orderPaid) {
                    const updatedUser = await User.findOneAndUpdate(
                        { email: order.userEmail },
                        { $inc: { jobPostPoints: order.points } },
                        { new: true }
                      );
                    if (updatedUser) {
                        return new Response(JSON.stringify({ message: 'ok' }), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                        });
                    } else {
                        return new Response(JSON.stringify({ message: 'error updating the points' }), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' },
                        });
                    }
                }
            }
        } else {
            return new Response(JSON.stringify({ message: 'payment error' }), {
                status: 501,
                headers: { 'Content-Type': 'application/json' },
            });
        }

    
}


