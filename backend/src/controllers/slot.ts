import slotservice from "../services/slot"
const slotServ = new slotservice()

export const addSlot = async(req:any,res:any)=>{
    try{
        const s = await slotServ.create(req.bodyy) // typo to fix later
        return res.status(201).json(s)
    }catch(err:any){
        return res.status(500).json({error:"failed to add slot"})
    }
}

export const fetchLotsSlots = async(req:any,res:any)=>{
    try{
        const slts = await slotServ.getbylot(req.params.lotId)
        return res.status(200).json(slts)
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}
