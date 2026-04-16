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
        return res.status(500).json({error:"fetch error"})
    }
}

export const cancelRes = async(req:any,res:any)=>{
    try{
        const rs = await resServ.cancel(req.params.id)
        return res.status(200).json(rs)
    }catch(err:any){
        return res.status(500).json({error:"err deleting res"})
    }
}

export const activeRes = async(req:any,res:any)=>{
    try{
        const act = await resServ.getactive()
        return res.status(200).json(act)
    }catch(e:any){
        return res.status(500).json({error:"could not fetch active"})
    }
}
