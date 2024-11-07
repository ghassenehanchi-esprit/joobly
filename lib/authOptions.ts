import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/database/dbConnect";
import { User } from "@/models/User";
import { compare } from "bcryptjs";
import mongoose from "mongoose";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect().catch(error => { error: "Connection Failed...!"});
        console.log(credentials);
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        mongoose.connect(process.env.MONGODB_URL as string);
        const user = await User.findOne({email});
        const passwordOk = user && await compare(password, user.password);

        if (passwordOk) {
          return user;
        }

        return null
      }
    })
  ],
};

