import mongoose, { Schema } from "mongoose";
import {userrole} from "../enums/enum"

const userschema:Schema = new Schema({
    name: { type: String, required: true },
    email:{type:String,required:true,unique:true},
    phone: { type: String,unique:true },
    password:{type:String,required:true},
    vehicleNumber: {type: String, required: true },
    role: { type: String,enum:Object.values(userrole),default: "user" },
}, { timestamps: true })

export default mongoose.model("user", userschema)