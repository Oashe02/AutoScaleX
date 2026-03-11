import mongoose, { Schema } from "mongoose";

const user = new Schema({
    name: { type: String, required: true },
    phone: { type: Number, unique: true },
    vehicleNumber: { type: String, required: true },
    role: { type: String, default: "user" },
}, { timestamps: true })

export default mongoose.model("user", user)