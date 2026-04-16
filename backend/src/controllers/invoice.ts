import invoiceservice from "../services/invoice"
const invservice = new invoiceservice()

export const generateinvoice = async(req:any,res:any)=>{
    try{
        const {bookingId,amount} = req.body
        const inv = await invservice.generate(req.user.id,bookingId,amount)
        return res.status(201).json({inv})
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}
export const getmyinvoices = async(req:any,res:any)=>{
    try{
        const invs = await invservice.getbyuser(req.user.id)
        return res.status(200).json(invs)
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}
export const getinvoicebyid = async(req:any,res:any)=>{
    try{
        const inv = await invservice.getbyid(req.params.id)
        if(!inv) return res.status(404).json({error:"not found"})
        return res.status(200).json(inv)
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}
