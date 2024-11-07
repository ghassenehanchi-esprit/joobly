'use server'
import {User} from "@/models/User";
import mongoose from "mongoose";
import { hash } from "bcryptjs";





export async function createUser(userBody: RegisterProps) {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        const {
            username, email, password
        } = userBody;
        const notHashedPassword = password as string;
        const hashedPassword = await hash(notHashedPassword, 12);
        console.log(username);
        console.log(email);
        console.log(hashedPassword);
        const user = await User.create({username, email, password: hashedPassword});
        console.log(user);
        return true;
    } catch (error) {
        console.log("shit")
        return false;
    }
    
}

