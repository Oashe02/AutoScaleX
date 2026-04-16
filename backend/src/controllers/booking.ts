import BookingService from "../services/booking"

class BookingController {
    private svc: any

    constructor() {
        this.svc = new BookingService()
    }

    public createNewBooking = async (req: any, res: any) => {
        try {
            const { slotId, lotId, type } = req.body
            const b = await this.svc.create(req.user.id, slotId, lotId, type)
            return res.status(201).json(b)
        } catch (err: any) {
            return res.status(400).json({ error: "booking failed: " + err.message })
        }
    }

    public fetchMyBookings = async (req: any, res: any) => {
        try {
            const userBk = await this.svc.getuserbookings(req.user.id)
            return res.status(200).json(userBk)
        } catch (e: any) {
            return res.status(500).json({ error: "fetch error" })
        }
    }

    public finishBooking = async (req: any, res: any) => {
        try {
            const booked = await this.svc.complete(req.params.id)
            return res.status(200).json(booked)
        } catch (err: any) {
            return res.status(500).json({ error: "could not finish" })
        }
    }

    public cancelMyBooking = async (req: any, res: any) => {
        try {
            const cancelled = await this.svc.cancel(req.params.id)
            return res.status(200).json(cancelled)
        } catch (e: any) {
            return res.status(500).json({ error: "failed to cancel" })
        }
    }

    public activeBks = async (req: any, res: any) => {
        try {
            const act = await this.svc.getactive()
            return res.status(200).json(act)
        } catch (e: any) {
            return res.status(500).json({ error: "no active bks" })
        }
    }

    public singleBooking = async (req: any, res: any) => {
        try {
            const b = await this.svc.getbyid(req.params.id)
            return res.status(200).json(b)
        } catch (e: any) {
            return res.status(404).json({ error: "missing" })
        }
    }
}

export default new BookingController()
