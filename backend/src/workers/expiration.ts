import Booking from '../models/booking'
import Slot from '../models/slot'
import { Bookingstatus, Slotstatus } from '../enums/enum'

export const startExpirationWorker = () => {
  setInterval(async ()=>{
    try {
      const now=new Date()
      const expiredBookings=await Booking.find({
        status:Bookingstatus.active,
        endTime:{$lt:now}
      })
      for (const bk of expiredBookings) {
        bk.status=Bookingstatus.completed
        await bk.save()
        await Slot.findByIdAndUpdate(bk.slotId,{status:Slotstatus.available})
      }
    } catch (e) {
      console.error(e)
    }
  }, 1000*60) 
}
