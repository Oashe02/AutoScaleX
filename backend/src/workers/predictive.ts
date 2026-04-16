import Slot from '../models/slot'
import { Slotstatus } from '../enums/enum'
import mongoose from 'mongoose'

const DemandSnapshotSchema = new mongoose.Schema({
  lotId:{type:mongoose.Schema.Types.ObjectId,ref:'ParkingLot'},
  occupiedCount:Number,
  totalCount:Number,
  timestamp:{type:Date,default:Date.now}
})

const DemandSnapshot=mongoose.model('DemandSnapshot',DemandSnapshotSchema)

export const startPredictiveWorker=()=>{
  setInterval(async ()=>{
    try{
      const slots=await Slot.find()
      const lotStats:any={}
      slots.forEach(s=>{
        if(!s.parkingLotId)return
        const lid=s.parkingLotId.toString()
        if(!lotStats[lid]) lotStats[lid]={occupied:0,total:0}
        lotStats[lid].total++
        if(s.status===Slotstatus.occupied||s.status===Slotstatus.reserved){
          lotStats[lid].occupied++
        }
      })

      for (const lid in lotStats) {
        await DemandSnapshot.create({
          lotId: lid,
          occupiedCount: lotStats[lid].occupied,
          totalCount: lotStats[lid].total
        })
      }
    } catch (e) {
      console.error(e)
    }
  },1000*60*60) 
}
