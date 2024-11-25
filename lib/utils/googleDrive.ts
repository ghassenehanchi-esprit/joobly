import { google } from 'googleapis';
import { Readable } from 'stream';
import { ReadableStream as NodeReadableStream } from 'web-streams-node';

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

  // Преобразование потока
  const nodeReadableStream = new NodeReadableStream(file.stream);

  const media = {
    mimeType: file.type,
    body: Readable.from(nodeReadableStream),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id, name',
  });

  return response.data; // Возвращаем информацию о загруженном файле
};