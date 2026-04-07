import BookingService from "../services/booking"
const svc = new BookingService()

export const createNewBooking = async(req:any,res:any)=>{
    try{
        if(!req.body.slotId) {
            return res.status(400).json({error:"slotId is required"})
        }
        const b = await svc.create(req.user.id,req.body.slotId)
        return res.status(201).json(b)
    }catch(err:any){
        return res.status(400).json({error:"booking failed: " + err.message})
    }
}

export const fetchMyBookings = async(req:any,res:any)=>{
    try{
        const userBk = await svc.getuserbookings(req.user.id)
        return res.status(200).json(userBk)
    }catch(e:any){
        return res.status(500).json({error:"fetch error"})
    }
}

export const finishBooking = async(req:any,res:any)=>{
    try{
        const booked = await svc.complete(req.params.id)
        return res.status(200).json(booked)
    }catch(err:any){
        return res.status(500).json({error:"could not finish"})
    }
}

export const cancelMyBooking = async(req:any,res:any)=>{
    try{
        const cancelled = await svc.cancel(req.params.id)
        return res.status(200).json(cancelled)
    }catch(e:any){
        return res.status(500).json({error:"failed to cancel"})
    }
}

export const activeBks = async(req:any,res:any)=>{
    try{
        const act = await svc.getactive()
        return res.status(200).json(act)
    }catch(e:any){
        return res.status(500).json({error:"no active bks"})
    }
}

export const singleBooking = async(req:any,res:any)=>{
    try{
        const b = await svc.getbyid(req.params.id)
        return res.status(200).json(b)
    }catch(e:any){
        return res.status(404).json({error:"missing"})
    }
}
