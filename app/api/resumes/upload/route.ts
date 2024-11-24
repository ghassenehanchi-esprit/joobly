
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Resume } from '@/models/Resume';
import { uploadToGoogleDrive } from '@/lib/utils/googleDrive';

export async function POST(req: NextRequest) {
    try {
      // Подключение к базе данных
      await mongoose.connect(process.env.MONGODB_URI as string);
  
      // Извлечение данных из FormData
      const formData = await req.formData();
      const file = formData.get('file') as File;
  
      if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
      }
  
      const metadata = {
        email: formData.get('email') as string,
        jobTitle: formData.get('title') as string,
        location: formData.get('location') as string,
      };
  
      // Загрузка файла в Google Drive
      const driveResponse = await uploadToGoogleDrive(file, metadata);
  
      // Сохранение информации в MongoDB
      const newResume = new Resume({
        fileName: driveResponse.name, // Имя файла из Google Drive
        email: metadata.email,
        jobTitle: metadata.jobTitle,
        location: metadata.location,
        createdAt: new Date(),
      });
  
      const savedResume = await newResume.save();
  
      return NextResponse.json({ success: true, resume: savedResume });
    } catch (error: any) {
      console.error('Error uploading resume:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }