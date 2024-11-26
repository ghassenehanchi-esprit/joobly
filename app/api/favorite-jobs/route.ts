import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "You need to be logged in" }), { status: 401 });
    }

    const email = session.user?.email;
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const { data } = await req.json();
    if (!data) {
    return new Response(JSON.stringify({ error: "No job data provided" }), { status: 400 });
    }

    // Проверяем, есть ли уже работа в избранных
    const jobExists = user.favoriteJobs.some((job: any) => job._id.toString() === data._id.toString());
    if (jobExists) {
      return new Response(JSON.stringify({ message: "Job already in favorites" }), { status: 400 });
    }

    // Добавляем работу в массив favoriteJobs
    user.favoriteJobs.push(data);
    await user.save();

    return new Response(JSON.stringify({ message: "Job added to favorites" }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}