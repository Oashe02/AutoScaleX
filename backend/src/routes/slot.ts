import express from "express"
import { addSlot,fetchLotsSlots } from "../controllers/slot"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/",authmiddleware,addSlot)
router.get("/lot/:lotId",fetchLotsSlots)

export default router
