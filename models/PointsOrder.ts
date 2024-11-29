import { Schema, model, models } from "mongoose";

export type PointsOrderTypes = {
    _id?: FormDataEntryValue;
    userEmail: string;
    title: string;
    price: string;
    points: string;
    paymentType: string;
    paid: boolean;
    createdAt?: Date;
  };

const PointsOrderSchema = new Schema({
    userEmail: {type: String, required: true},
    title: {type: String, required: true},
	price: {type: Number, required: true},
	points: {type: Number, required: true},
    paymentType: {type: String},
    paid: {type: Boolean, default: false},
}, {timestamps: true});


export const PointsOrder = models?.PointsOrder || model('PointsOrder', PointsOrderSchema);