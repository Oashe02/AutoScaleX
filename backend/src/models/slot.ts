import mongoose, { Schema } from "mongoose";
import { Slottype , Slotstatus} from "../enums/enum"

const slot =  new Schema({
    slotnumber: {type:String,required:true},
    type:{type:String,enum:Object.values(Slottype),required:true},
    status:{type:String,enum:Object.values(Slotstatus),default:Slotstatus.available},
    parkingLotId:{type:Schema.Types.ObjectId,ref:"parkinglot"}
}, { timestamps: true })

export default mongoose.model("slot", slot)