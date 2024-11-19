import { Job } from '@/models/Job';
import { NextResponse } from 'next/server';
import mongoose from "mongoose";



export async function GET(request: Request, { params }: { params: { id: string }}) {
    const { id } = params;
    await mongoose.connect(process.env.MONGODB_URI as string);
    const singleJob = await Job.findById(id);
    return NextResponse.json(singleJob);
  }

