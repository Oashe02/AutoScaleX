import Payment from "../models/payment"
import Invoice from "../models/invoice"
import { paymentstatus, invoicestatus } from "../enums/enum"

class paymentservice {
    async processpayment(invId:string,amt:number,method:string){
        const inv = await Invoice.findById(invId)
        if(!inv) throw new Error("not found")

        const pmt = await Payment.create({
            invoiceId:invId,
            amount:amt,
            method:method,
            status:paymentstatus.pending
        })
        
        pmt.status = paymentstatus.paid
        pmt.transactionId = "TXN_" + Date.now()
        await pmt.save()

        await Invoice.findByIdAndUpdate(invId,{status:invoicestatus.paid})
        return pmt
    }
    async getbyinvoice(invId:string){
        return await Payment.find({invoiceId:invId})
    }
    async getbyid(id:string){
        return await Payment.findById(id)
    }
    async refund(id:string){
        const pmt = await Payment.findById(id)
        if(!pmt) throw new Error("not found")
        pmt.status = paymentstatus.refunded
        await pmt.save()
        return pmt
    }
}

export default paymentservice
