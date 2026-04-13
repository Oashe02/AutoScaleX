import paymentservice from "../services/payment"
const pmtservice = new paymentservice()

export const processPayment = async(req:any,res:any)=>{
    try{
        const {invoiceId,amount,method} = req.body
        const pmt = await pmtservice.processpayment(invoiceId,amount,method)
        return res.status(201).json(pmt)
    }catch(err:any){
        return res.status(500).json({error:"payment fail hua"})
    }
}

export const fetchPayments = async(req:any,res:any)=>{
    try{
        const pmts = await pmtservice.getbyinvoice(req.params.invoiceId)
        return res.status(200).json(pmts)
    }catch(e:any){
        return res.status(500).json({error:"could not fetch inv"})
    }
}

export const fetchSinglePmt = async(req:any,res:any)=>{
    try{
        const pmt = await pmtservice.getbyid(req.params.id)
        if(!pmt) return res.status(404).json({error:"pmt missing"})
        return res.status(200).json(pmt)
    }catch(e:any){
        return res.status(500).json({error:"server err pmt fetch"})
    }
}

export const processRefund = async(req:any,res:any)=>{
    try{
        const pmt = await pmtservice.refund(req.params.id)
        return res.status(200).json(pmt)
    }catch(e:any){
        return res.status(500).json({error:"refund nai hua dekho"})
    }
}
