import Reservation from "../models/reservation"
import Slot from "../models/slot"

class reservationservice {
    async create(userid:string,slotid:string,from:Date,to:Date){
        const slt = await Slot.findById(slotid)
        if(!slt || (slt as any).status !== "available"){
            throw new Error("not available")
        }
        await Slot.findByIdAndUpdate(slotid,{status:"reserved"})

        const rs = await Reservation.create({
            userId:userid,slotId:slotid,reservedFrom:from,reservedTo:to,
            status:"active"
        })
        return rs
    }
    async cancel(id:string){
        const rs = await Reservation.findById(id)
        if(!rs) throw new Error("not found")
        rs.status = "cancelled"
        await rs.save()
        await Slot.findByIdAndUpdate(rs.slotId,{status:"available"})
        return rs
    }
    async getuserreservations(userid:string){
        return await Reservation.find({userId:userid}).populate("slotId")
    }
    async getactive(){
        return await Reservation.find({status:"active"}).populate("slotId")
    }
    async checkexpired(){
        const now = new Date()
        const expired = await Reservation.find({
            status:"active",
            reservedTo:{$lte:now}
        })
        for(const r of expired){
            r.status = "expired"
            await r.save()
            await Slot.findByIdAndUpdate(r.slotId,{status:"available"})
        }
        return expired
    }
}

export default reservationservice
