import mongoose, { Schema } from "mongoose";

const parkinglot = new Schema({
    name:{type: String, required: true },
    location:{type: String, required: true },
    totalSlots:{type: Number, required: true },
    availableSlots:{type: Number, required: true },
}, { timestamps: true })

export default mongoose.model("parkinglot", parkinglot)