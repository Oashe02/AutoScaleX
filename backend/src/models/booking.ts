import mongoose, { Schema } from "mongoose";
import { Bookingstatus } from "../enums/enum";

const booking = new Schema({
    userId:{type: Schema.Types.ObjectId, ref: "user", required: true },
    slotId:{type: Schema.Types.ObjectId, ref: "slot", required: true },
    startTime:{type: Date, required: true },
    endTime:{type: Date },
    status:{type: String,enum:Object.values(Bookingstatus),default:Bookingstatus.active},
    invoiceId:{type: Schema.Types.ObjectId,ref:"invoice" },
}, { timestamps: true })    


export default mongoose.model("booking", booking)