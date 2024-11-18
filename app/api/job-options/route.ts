import { NextResponse } from "next/server";
import { Job } from "@/models/Job";
import mongoose from "mongoose";

export async function GET() {
  try {
    const dbUri = process.env.MONGODB_URI;

    if (!dbUri) {
      return NextResponse.json(
        { error: "Database URI is not defined in environment variables" },
        { status: 500 }
      );
    }

    await mongoose.connect(dbUri);
    const jobs = await Job.find({});
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching job options:", error);

    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}