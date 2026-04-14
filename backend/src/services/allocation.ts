import Slot from "../models/slot"
import { Slotstatus } from "../enums/enum"

class allocationservice {
    async findbestslot(lotid:string,pref?:string){
        const q:any = {
            parkingLotId:lotid,
            status:Slotstatus.available
        }
        if(pref){
            q.type = pref
        }
        let slt = await Slot.findOne(q)
        if(!slt && pref){
            delete q.type
            slt = await Slot.findOne(q)
        }
        return slt
    }

    async getstats(lotid:string){
        const t = await Slot.countDocuments({parkingLotId:lotid})
        const o = await Slot.countDocuments({parkingLotId:lotid,status:Slotstatus.occupied})
        const r = await Slot.countDocuments({parkingLotId:lotid,status:Slotstatus.reserved})
        const a = await Slot.countDocuments({parkingLotId:lotid,status:Slotstatus.available})
        
        const rate = t > 0 ? ((o + r) / t) * 100 : 0
        return {
            total:t,occupied:o,reserved:r,available:a,
            occupancyRate: Math.round(rate * 100) / 100
        }
    }
    async ishighdemand(lotid:string){
        const stats = await this.getstats(lotid)
        return stats.occupancyRate > 85
    }
}

export default allocationservice
