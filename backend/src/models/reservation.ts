import mongoose, { Schema } from "mongoose";
import { reservationstatus } from "../enums/enum";

const reservation = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"user",required:true},
    slotId: {type:Schema.Types.ObjectId,ref:"slot",required:true},
    reservedFrom:{type:Date,required:true},
    reservedTo:{type: Date, required: true },
    status:{type: String,enum:Object.values(reservationstatus),default:reservationstatus.active,}},
    {timestamps:true}
)

export default mongoose.model("reservation", reservation)

