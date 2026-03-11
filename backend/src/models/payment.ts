import mongoose, { Schema } from "mongoose";
import { paymentstatus, paymentmethod } from "../enums/enum";

const payment = new Schema({
    invoiceId:{type: Schema.Types.ObjectId,ref:"invoice",required:true},
    amount:{type: Number,required:true},
    method:{type: String,enum: Object.values(paymentmethod),required: true,},
    status:{type: String,enum: Object.values(paymentstatus),required: true,},
    transactionId: { type: String },
},
    { timestamps: true }
)

export default mongoose.model("payment", payment)