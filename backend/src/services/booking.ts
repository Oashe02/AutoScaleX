import Booking from "../models/booking"
import Slot from "../models/slot"
import {Slotstatus,Bookingstatus} from "../enums/enum"

class bookingservice {
    async create(userid:string,slotid:string){
        const slt = await Slot.findById(slotid)
        if(!slt || (slt as any).status !== "available"){
            throw new Error("not available")
        }
        await Slot.findByIdAndUpdate(slotid,{status:"occupied"})
        const bk = await Booking.create({
            userId:userid,
            slotId:slotid,
            startTime:new Date(),
            status:Bookingstatus.active
        })
        return bk
    }
    async complete(id:string){
        const bk = await Booking.findById(id)
        if(!bk) throw new Error("not found")
        bk.endTime = new Date()
        bk.status = Bookingstatus.completed
        await bk.save()
        await Slot.findByIdAndUpdate(bk.slotId,{status:"available"})
        return bk
    }
    async cancel(id:string){
        const bk = await Booking.findById(id)
        if(!bk) throw new Error("not found")
        bk.status = Bookingstatus.cancelled
        await bk.save()
        await Slot.findByIdAndUpdate(bk.slotId,{status:"available"})
        return bk
    }

    async getuserbookings(userid:string){
        return await Booking.find({userId:userid}).populate("slotId")
    }
    async getbyid(id:string){
        return await Booking.findById(id).populate("slotId")
    }
    async getactive(){
        return await Booking.find({status:Bookingstatus.active}).populate("slotId")
    }
}

export default bookingservice
