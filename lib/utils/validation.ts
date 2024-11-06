import { z } from "zod";


export const RegisterFormSchema = z.object({
    name: z.string().min(3, {message: 'Name must be at least 3 characters long'}).max(30, "Name must be at most 50 characters"),
    email: z.string().email('Email is not correct'),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const validateRegisterForm = (data: any) => {
    try {
        RegisterFormSchema.parse(data);
        return [];
    } catch (ev) {
        if (ev instanceof z.ZodError) {
            return ev.errors.map((error, index) => `${index + 1}: ${error.message}`);
        }
        return ["Unknown validation error"];
    }
};


export const LoginFormSchema = z.object({
    name: z.string().min(3, {message: 'Name must be at least 3 characters long'}).max(30, "Name must be at most 50 characters"),
    email: z.string().email('Email is not correct'),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const validateLoginForm = (data: any) => {
    try {
        RegisterFormSchema.parse(data);
        return [];
    } catch (ev) {
        if (ev instanceof z.ZodError) {
            return ev.errors.map((error, index) => `${index + 1}: ${error.message}`);
        }
        return ["Unknown validation error"];
    }
};