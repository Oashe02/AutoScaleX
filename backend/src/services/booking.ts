import Booking from "../models/booking"
import Slot from "../models/slot"
import {Slotstatus,Bookingstatus} from "../enums/enum"
import AllocationService from "./allocation"

const alloc=new AllocationService()

class bookingservice {
    async create(userid:string,slotid?:string,lotid?:string,pref?:string){
        let slotide=slotid
        
        if(!slotide&&lotid){
            const best=await alloc.findbestslot(lotid,pref)
            if(!best) throw new Error("no available slots")
            slotide =(best as any)._id
        }

        if(!slotide) throw new Error("slotid chahiye")

        const s = await Slot.findById(slotide)
        if(!s||(s as any).status!==Slotstatus.available){
            throw new Error("slot is not available")
        }

        await Slot.findByIdAndUpdate(slotide,{status:Slotstatus.occupied})
        
        const bk = await Booking.create({
            userId:userid,
            slotId:slotide,
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
        await Slot.findByIdAndUpdate(bk.slotId,{status: Slotstatus.available})
        return bk
    }
    async cancel(id:string){
        const bk = await Booking.findById(id)
        if(!bk) throw new Error("not found")
        bk.status = Bookingstatus.cancelled
        await bk.save()
        await Slot.findByIdAndUpdate(bk.slotId,{status: Slotstatus.available})
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
