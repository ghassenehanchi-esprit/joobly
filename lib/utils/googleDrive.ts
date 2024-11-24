import { google } from 'googleapis';
import { Readable } from 'stream';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

export const uploadToGoogleDrive = async (file: File, metadata: Record<string, string>) => {
  const fileMetadata = {
    name: file.name,
    description: `Resume uploaded by ${metadata.email}`,
    properties: {
      email: metadata.email,
      jobTitle: metadata.jobTitle,
      location: metadata.location,
    },
  };

  const media = {
    mimeType: file.type,
    body: Readable.from(file.stream),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id, name',
  });

  return response.data; // Возвращаем информацию о загруженном файле
};