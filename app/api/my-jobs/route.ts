import {authOptions} from "@/lib/authOptions";
import {getServerSession} from "next-auth";
import { User } from '@/models/User';
import { Job } from '@/models/Job';
import { isIdentical } from '@/lib/constant/helpers';
import mongoose from "mongoose";



export async function DELETE(req: Request) {
    mongoose.connect(process.env.MONGODB_URI as string);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    const session = await getServerSession(authOptions);
    if (!session) throw 'you need to be logged in';
    const email = session.user?.email;
    const user = await User.findOne({email});
    const myJob = await Job.findById(_id);

    const userHasProperty = isIdentical(user._id, myJob.jobPostAuthorId);

    if (userHasProperty) {
      await Job.deleteOne({_id});
      return Response.json(true);
    } else {
      return Response.json({message: "error, you don't have property", code: 501});
    }
    
  }