import ParkingLotService from "../services/parkinglot"
const serv = new ParkingLotService()

export const createLot = async(req:any,res:any)=>{
    try{
        const newlot = await serv.create(req.body) 
        return res.status(201).json(newlot)
    }catch(err:any){
        return res.status(500).json({error:"creation failed"})
    }
}

export const getAllLots = async(req:any,res:any)=>{
    try{
        const data = await serv.getall()
        return res.status(200).json(data)
    }catch(e:any){
        return res.status(500).json({error:"something went wrong"})
    }
}

export const getLotInfo = async(req:any,res:any)=>{
    try{
        const fetchLot = await serv.getbyid(req.params.id)
        return res.status(200).json(fetchLot)
    }catch(err:any){
        return res.status(404).json({error:"lot not found"})
    }
}

export const updateLot = async(req:any,res:any)=>{
    try{
        const updated = await serv.update(req.params.id,req.body)
        return res.status(200).json(updated)
    }catch(err:any){
        return res.status(500).json({error:"update failed"})
    }
}

export const deleteLot = async(req:any,res:any)=>{
    try{
        await serv.deletelot(req.params.id)
        return res.status(200).json({msg:"deleted successfully"})
    }catch(e:any){
        return res.status(500).json({error:"could not delete"})
    }
}
