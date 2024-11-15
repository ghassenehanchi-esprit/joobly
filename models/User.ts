import {model, models, Schema} from "mongoose";

export type UserProfileTypes = {
  _id?: FormDataEntryValue;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  admin: string;
  emailVerified: boolean;
  jobPostPoints: number;
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
  jobPostPoints: {type: Number, default: 0}
}, {timestamps: true});

export const User = models?.User || model<UserProfileTypes>('User', UserSchema);