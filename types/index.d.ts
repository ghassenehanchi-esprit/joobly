import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare interface RegisterProps {
    name?: string;
    email: string;
    password: string;
    image?: string;
    admin?: boolean,
}

declare interface UserTypes {
	name: string;
	email: string;
	image: string;
}


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}