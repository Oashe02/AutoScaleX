import mongoose, { Schema } from "mongoose";
import {userrole} from "../enums/enum"

const user:Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: Number, unique: true },
    vehicleNumber: { type: String, required: true },
    role: { type: String,enum:Object.values(userrole),default: "user" },
}, { timestamps: true })

export default mongoose.model("user", user)