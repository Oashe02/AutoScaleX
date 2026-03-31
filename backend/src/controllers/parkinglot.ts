import ParkingLotService from "../services/parkinglot"
const serv = new ParkingLotService()

export const createLot = async(req:any,res:any)=>{
    try{
        const newlot = await serv.create(req.bod) // Mistake here intentionally
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
