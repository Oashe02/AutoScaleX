import express from "express"
import { createLot,getAllLots } from "../controllers/parkinglot"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/",authmiddleware,createLot)
router.get("/",getAllLots)

export default router
