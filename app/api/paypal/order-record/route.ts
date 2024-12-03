import mongoose from "mongoose";
import { authOptions } from "@/lib/authOptions";
import { PointsOrder } from "@/models/PointsOrder";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGODB_URI as string);
    const { title, price, points } = await req.json();

    console.log("Received order data:", { title, price, points });

     const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || undefined;

    

    if (!userEmail) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    try {

    const orderDoc = await PointsOrder.create({
        userEmail,
        title,
        price,
        points,
        paymentType: "paypal",
        paid: true,
    });

    if (orderDoc)  {
        await User.findOneAndUpdate(
            { email: userEmail },
            { $inc: { points: points } }
        );
    }


    return NextResponse.json({ message: "Your points has been added!" });
    } catch (error) {
        console.error("Error processing order:", error);
        return NextResponse.json({ error: "Failed to save order and update points" }, { status: 500 });
    }
}
