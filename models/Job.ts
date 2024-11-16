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
  jobTitle: { type: String, required: true }, //1
  description: { type: String, required: true },//1
  jobUrl: { type: String, required: true }, //1
  location: { type: String },//1
  language: { type: String },//1
  contractType: { type: String },//1
  workingHours: { type: String },
  salary: { type: String },//1
  currency: { type: String },//1
  salaryDetail: { type: String },//1
  advertisedDate: { type: String },//1
  postedDate: { type: String }, //1
  closeDate: { type: String },//1
  education: { type: String },//1
  companyDetails: {
    ceoCompany: { type: String },
    founded: { type: String },
    companySize: { type: String },
    companyWebsite: { type: String },
  },
});


export const Job = models?.Job || model<JobTypes>('Job', JobSchema);