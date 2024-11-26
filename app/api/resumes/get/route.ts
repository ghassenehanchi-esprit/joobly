import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Resume } from '@/models/Resume';

export async function GET() {
  try {
    // Db connection
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Get resumes list
    const resumes = await Resume.find({});
    return NextResponse.json({ resumes });
  } catch (error: any) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}