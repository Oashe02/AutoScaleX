import express from "express"
import bookingController from "../controllers/booking"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/", authmiddleware, bookingController.createNewBooking)
router.get("/my", authmiddleware, bookingController.fetchMyBookings)
router.put("/complete/:id", authmiddleware, bookingController.finishBooking)
router.put("/cancel/:id", authmiddleware, bookingController.cancelMyBooking)
router.get("/active", authmiddleware, bookingController.activeBks)
router.get("/:id", authmiddleware, bookingController.singleBooking)

export default router
