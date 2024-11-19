import {model, models, Schema} from "mongoose";


export type JobTypes = {
    _id?: FormDataEntryValue;
    jobTitle: string;
    description: string;
    jobUrl: string;
    location?: string;
    language?: string;
    workType?: string;
    jobTime?: string;
    salary: number;
    currency: string;
    salaryDetail: string;
    advertisedDate?: string;
    postedDate?: string;
    closeDate?: string
    education?: string;
    experienceLevel?: string;
    companyDetails?: {
        ceoCompany: string;
        founded: string;
        companySize: string;
        companyWebsite: string;
    };
    views?: number;
    jobPostAuthorId?: string;
    createdAt?: Date;
  };

const JobSchema = new Schema({
  jobTitle: { type: String, required: true }, //1
  description: { type: String, required: true },//1
  jobUrl: { type: String, required: true }, //1
  location: { type: String },//1
  language: { type: String },//1
  workType: { type: String },//1
  jobTime: { type: String },
  salary: { type: String },//1
  currency: { type: String },//1
  salaryDetail: { type: String },//1
  advertisedDate: { type: String },//1
  postedDate: { type: String }, //1
  closeDate: { type: String },//1
  education: { type: String },//1
  experienceLevel: {type: String},//1
  companyDetails: {
    ceoCompany: { type: String },
    founded: { type: String },
    companySize: { type: String },
    companyWebsite: { type: String },
  },
  views: { type: String, default: 0}, 
  jobPostAuthorId: { type: String }, 
});


export const Job = models?.Job || model<JobTypes>('Job', JobSchema);