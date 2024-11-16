import {model, models, Schema} from "mongoose";


export type JobTypes = {
    _id?: FormDataEntryValue;
    jobTitle: string;
    description: string;
    jobUrl: string;
    location: string;
    language: string;
    contractType: string;
    workingHours: string;
    salary: number;
    currency: string;
    salaryDetail: string;
    advertisedDate: string;
    postedDate: string;
    closeDate: string
    workType: string;
    education: string;
    companyDetails: {
        ceoCompany: string;
        founded: string;
        companySize: string;
        companyWebsite: string;
    };
    createdAt?: Date;
  };

const JobSchema = new Schema({
  id: { type: Number },
  jobTitle: { type: String, required: true },
  description: { type: String, required: true },
  jobUrl: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  currency: { type: String },
  salaryDetail: { type: String },
  postedDate: { type: String },
  workType: { type: String },
  education: { type: String },
  worType: { type: String },
  advertisedDate: { type: String },
  closeDate: { type: String },
  companyDetails: {
    ceoCompany: { type: String },
    founded: { type: String },
    companySize: { type: String },
    companyWebsite: { type: String },
  },
});


export const Job = models?.Job || model<JobTypes>('Job', JobSchema);