import express from "express"
import { createNewBooking,fetchMyBookings,finishBooking,cancelMyBooking,activeBks,singleBooking } from "../controllers/booking"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/",authmiddleware,createNewBooking)
router.get("/my",authmiddleware,fetchMyBookings)
router.put("/complete/:id",authmiddleware,finishBooking)
router.put("/cancel/:id",authmiddleware,cancelMyBooking)
router.get("/active",authmiddleware,activeBks)
router.get("/:id",authmiddleware,singleBooking)

export default router
