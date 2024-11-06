import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import {User} from '@/models/User';
import { compare } from "bcryptjs";
import dbConnect from "@/database/dbConnect";


import {MongoDBAdapter} from "@auth/mongodb-adapter";
import client from "@/database/dbClient"


export const authOptions = {
    adapter: MongoDBAdapter(client),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          await dbConnect().catch((error: any) => { error: "Connection Failed...!"});
          console.log(credentials);
          const email = credentials?.email as string;
          const password = credentials?.password as string;
  
          mongoose.connect(process.env.MONGODB_URI as string);
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
  
  export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return false;
    }
    const userInfo = await User.findOne({email:userEmail});
    if (!userInfo) {
      return false;
    }
    return userInfo.admin;
  }
  
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST }