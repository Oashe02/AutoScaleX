import Invoice from "../models/invoice"
import Booking from "../models/booking"

class invoiceservice{
    async generate(userid:string,bookingid:string,amt:number){
        const bk= await Booking.findById(bookingid)
        if(!bk) throw new Error("not found")
        const inv=await Invoice.create({
            userId:userid,
            bookingId:bookingid,
            amount:amt,
        })
        bk.invoiceId=inv._id as any
        await bk.save()
        return inv
    }
    async getbyuser(userid:string){
        return await Invoice.find({userId:userid}).populate("bookingId")
    }
    async getbyid(id:string){
        return await Invoice.findById(id).populate("bookingId")
    }
}

export default invoiceservice
