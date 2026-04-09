import reservationservice from "../services/reservation"
const resServ = new reservationservice()

export const makeReservation = async(req:any,res:any)=>{
    try{
        const {slotId,reservedFrom,reservedTo} = req.body
        const rs = await resServ.create(req.user.id,slotId,new Date(reservedFrom),new Date(reservedTo))
        return res.status(201).json(rs)
    }catch(err:any){
        return res.status(400).json({error:"failed creating reservation"})
    }
}

export const fetchMyRes = async(req:any,res:any)=>{
    try{
        const rs = await resServ.getuserreservations(req.user.id)
        return res.status(200).json(rs)
    }catch(err:any){
        return res.status(500).json({error:"fetch error map"})
    }
}
