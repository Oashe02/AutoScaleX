import mongoose, { Schema } from "mongoose";
import { invoicestatus } from "../enums/enum";

const invoice = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"user",required:true},
    bookingId: { type: Schema.Types.ObjectId, ref: "booking", required: true },
    amount: { type: Number, required: true },
    status:{type:String,enum:Object.values(invoicestatus),default:invoicestatus.pending},
    issuedat:{type:Date,default:Date.now}
}, { timestamps: true })

export default mongoose.model("invoice", invoice)
