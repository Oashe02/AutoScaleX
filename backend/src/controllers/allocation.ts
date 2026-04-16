import allocationservice from "../services/allocation"
const allocservice = new allocationservice()

export const findslot = async(req:any,res:any)=>{
    try{
        const {lotId,type} = req.query
        if(!lotId) return res.status(400).json({error:"need lotId"})
        
        const slt = await allocservice.findbestslot(lotId as string,type as string)
        if(!slt) return res.status(404).json({error:"none available"})
        return res.status(200).json({slt})
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}
export const getstats = async(req:any,res:any)=>{
    try{
        const stats = await allocservice.getstats(req.params.lotId)
        return res.status(200).json(stats)
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}
export const checkdemand = async(req:any,res:any)=>{
    try{
        const high = await allocservice.ishighdemand(req.params.lotId)
        return res.status(200).json({lotId:req.params.lotId,high})
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}
