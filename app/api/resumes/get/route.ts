import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Resume } from '@/models/Resume';

export async function GET() {
  try {
    // Подключение к базе данных
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Получение списка резюме
    const resumes = await Resume.find({});
    return NextResponse.json({ resumes });
  } catch (error: any) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}