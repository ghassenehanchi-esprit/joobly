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


    
   
    const updatedUser = await User.findOneAndUpdate(
        { email: userEmail }, // Find user with email
        { $inc: { jobPostPoints: points } }, // Increase -> jobPostPoints + points
        { new: true } // Return updated doc
      );
    

    if (updatedUser) {
        return NextResponse.json({ message: "Your points has been added!" });
    } else {
        return NextResponse.json({ message: "Some thing went wrong!" });
    }

    } catch (error) {
        console.error("Error processing order:", error);
        return NextResponse.json({ error: "Failed to save order and update points" }, { status: 500 });
    }
}
