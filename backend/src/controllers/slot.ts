import slotservice from "../services/slot"
const slotServ = new slotservice()

export const addSlot = async(req:any,res:any)=>{
    try{
        const s = await slotServ.create(req.body)
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

export const fetchAvailable = async(req:any,res:any)=>{
    try{
        const available = await slotServ.getavailable(req.params.lotId)
        return res.status(200).json(available)
    }catch(err:any){
        return res.status(500).json({error:"could not fetch available slots"})
    }
}

export const changeStatus = async(req:any,res:any)=>{
    try{
        const stat = await slotServ.updatestatus(req.params.id,req.body.status)
        return res.status(200).json(stat)
    }catch(e:any){
        return res.status(500).json({error:"status change err"})
    }
}

export const removeSlot = async(req:any,res:any)=>{
    try{
        await slotServ.deleteslot(req.params.id)
        return res.status(200).json({msg:"slot removed"})
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}
