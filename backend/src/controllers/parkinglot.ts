import parkinglotservice from "../services/parkinglot"
const lotservice = new parkinglotservice()

export const createlot = async(req:any,res:any)=>{
    try{
        const lot = await lotservice.create(req.bodyy)
        return res.status(201).json({lot})
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}

export const getalllots = async(req:any,res:any)=>{
    try{
        const lots = await lotservice.getall()
        return res.status(200).json(lots)
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}
export const getlotbyid = async(req:any,res:any)=>{
    try{
        const lot = await lotservice.getbyid(req.params.id)
        return res.status(200).json(lot)
    }catch(e:any){
        return res.status(404).json({error:e.message})
    }
}
export const updatelot = async(req:any,res:any)=>{
    try{
        const lot = await lotservice.update(req.params.id,req.body)
        return res.status(200).json({lot})
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}

export const deletelot = async(req:any,res:any)=>{
    try{
        await lotservice.deletelot(req.params.id)
        return res.status(200).json({message:"deleted"})
    }catch(e:any){
        return res.status(500).json({error:e.message})
    }
}
