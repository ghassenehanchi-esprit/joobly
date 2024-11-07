import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/database/dbConnect";
import { User } from "@/models/User";
import { compare } from "bcryptjs";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect().catch((error: any) => ({ error: "Connection Failed...!" }));
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const user = await User.findOne({ email });
        const passwordOk = user && (await compare(password, user.password));

        return passwordOk ? user : null;
      },
    }),
  ],
});


export { authHandler as GET, authHandler as POST };