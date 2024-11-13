import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  username: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String},
  image: {type: String},
  admin: {type: Boolean, default: false},
  emailVerified: { type: Boolean, default: false },
  jobPostings: {type: Number, default: 0}
}, {timestamps: true});

export const User = models?.User || model('User', UserSchema);