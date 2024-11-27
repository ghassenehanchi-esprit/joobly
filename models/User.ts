import {model, models, Schema} from "mongoose";
import { JobSchema, JobTypes } from "./Job";

export type UserProfileTypes = {
  _id?: FormDataEntryValue;
  name: string;
  email: string;
  password: string;
  phone?: string;
  image?: string;
  admin?: string;
  emailVerified: boolean;
  jobPostPoints: number;
  favoriteJobs?: JobTypes[]; 
  createdAt?: Date;
};

const UserSchema = new Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String},
  phone: {type: String},
  image: {type: String},
  admin: {type: Boolean, default: false},
  emailVerified: { type: Boolean, default: false },
  jobPostPoints: { type: Number, default: 0 },
  favoriteJobs: {
    type:[JobSchema]
}
}, {timestamps: true});

export const User = models?.User || model<UserProfileTypes>('User', UserSchema);