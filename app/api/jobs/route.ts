import { Job } from "@/models/Job";
import mongoose from "mongoose";
import xlsx from "xlsx";

import {authOptions} from "@/lib/authOptions";
import {getServerSession} from "next-auth";
import { User } from "@/models/User";
import { SALARY_RANGES } from "@/lib/constant/constants";


export async function POST(req: Request) {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);

        const session = await getServerSession(authOptions);
        if (!session) throw 'you need to be logged in';
        const email = session.user?.email;
        const profileInfoDoc = await User.findOne({ email });

        if (profileInfoDoc) {
            const data = await req.json();
            const job = await Job.create({
                ...data,
                advertisedDate: new Date().toISOString(),
                jobPostAuthorId: profileInfoDoc._id,
            });

            profileInfoDoc.jobPostPoints -= 1; 
            await profileInfoDoc.save();

            return Response.json(job);
        } else {
            throw 'you need to be logged in';
        }
    } catch (error) {
        return Response.json({ error });
    }
}


const escapeRegExp = (value: string) => value.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

export async function GET(req: Request) {
    try {
        const dbUri = process.env.MONGODB_URI;

        if (!dbUri) {
                return Response.json(
                        { error: "Database URI is not defined in environment variables" },
                        { status: 500 },
                );
        }

        await mongoose.connect(dbUri);

        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (id) {
                const job = await Job.findById(id);
                if (job) {
                        return Response.json(job);
                }

                return Response.json({ message: "Job not found" }, { status: 404 });
        }

        const searchParams = url.searchParams;
        const filter: Record<string, any> = {};

        const uniqueKeys = Array.from(new Set(searchParams.keys()));

        uniqueKeys.forEach((key) => {
                const values = searchParams
                        .getAll(key)
                        .map((value) => value.trim())
                        .filter(Boolean);

                if (!values.length) {
                        return;
                }

                if (values.length === 1) {
                        const escapedValue = escapeRegExp(values[0]);
                        filter[key] = { $regex: new RegExp(`.*${escapedValue}.*`, "i") };
                        return;
                }

                filter[key] = {
                        $in: values.map((value) => new RegExp(`.*${escapeRegExp(value)}.*`, "i")),
                };
        });

        const jobs = await Job.find(filter);
        return Response.json({ length: jobs.length, jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

        return Response.json({ error: errorMessage }, { status: 500 });
    }
}


{/*

export async function DELETE(req) {
  await connectToDB();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return Response.json({ message: "ID is required" }, { status: 400 });
  }

  if (await isAdmin()) {
    const result = await Jobs.findByIdAndDelete(id);
    if (result) {
      return Response.json({ message: "Job is deleted" });
    } else {
      return Response.json({ message: "Job not found" }, { status: 404 });
    }
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  }
}
  
  */}

