import express from "express"
import { addSlot,fetchLotsSlots,fetchAvailable,changeStatus,removeSlot } from "../controllers/slot"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/",authmiddleware,addSlot)
router.get("/lot/:lotId",fetchLotsSlots)
router.get("/available/:lotId",fetchAvailable)
router.put("/:id",authmiddleware,changeStatus)
router.delete("/:id",authmiddleware,removeSlot)

export default router
