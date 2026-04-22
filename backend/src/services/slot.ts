import Slot from "../models/slot"
import Parkinglot from "../models/parkinglot"
import { Slotstatus } from "../enums/enum"

class slotservice {
    async create(data:any){
        const slt = await Slot.create(data)
        await Parkinglot.findByIdAndUpdate(data.parkingLotId,{$inc:{totalSlots:1,availableSlots:1}})
        return slt
    }
    async getbylot(lotid:string){
        return await Slot.find({parkingLotId:lotid})
    }
    async getavailable(lotid:string){
        return await Slot.find({parkingLotId:lotid,status:Slotstatus.available})
    }
    async getbyid(id:string){
        const slt = await Slot.findById(id)
        if(!slt) throw new Error("not found")
        return slt
    }
    async updatestatus(id:string,status:string){
        const oldSlot = await Slot.findById(id);
        if(!oldSlot) throw new Error("not found");
        
        const oldStatus = (oldSlot as any).status;
        const slt = await Slot.findByIdAndUpdate(id,{status},{new:true});
        
        // Update availableSlots count in Parkinglot
        if (oldStatus === Slotstatus.available && status !== Slotstatus.available) {
            await Parkinglot.findByIdAndUpdate((oldSlot as any).parkingLotId, { $inc: { availableSlots: -1 } });
        } else if (oldStatus !== Slotstatus.available && status === Slotstatus.available) {
            await Parkinglot.findByIdAndUpdate((oldSlot as any).parkingLotId, { $inc: { availableSlots: 1 } });
        }
        
        return slt
    }

    async deleteslot(id:string){
        const slt = await Slot.findByIdAndDelete(id)
        if(!slt) throw new Error("not found")
        return slt
    }
}

export default slotservice
