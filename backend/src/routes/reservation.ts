import express from "express"
import { makeReservation,fetchMyRes,cancelRes,activeRes } from "../controllers/reservation"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/",authmiddleware,makeReservation)
router.get("/my",authmiddleware,fetchMyRes)
router.put("/cancel/:id",authmiddleware,cancelRes)
router.get("/active",authmiddleware,activeRes)

export default router
