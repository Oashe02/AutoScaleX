import express from "express"
import { makeReservation,fetchMyRes } from "../controllers/reservation"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/",authmiddleware,makeReservation)
router.get("/my",authmiddleware,fetchMyRes)

export default router
