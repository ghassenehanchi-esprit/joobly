import {model, models, Schema} from "mongoose";

export type ResumeTypes = {
    _id?: FormDataEntryValue;
    fileName: string;
    fileLink: string;
    email: string;
    jobTitle: string;
    location: string;
    createdAt?: Date;
  };

const ResumeSchema = new Schema({
  fileName: { type: String },
  fileLink: { type: String },
  email: { type: String },
  jobTitle: { type: String },
  location: {type: String },
}, {timestamps: true});

export const Resume = models?.Resume || model<ResumeTypes>('Resume', ResumeSchema);