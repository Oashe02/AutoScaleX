import express from "express"
import { createLot,getAllLots,getLotInfo,updateLot,deleteLot } from "../controllers/parkinglot"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/",authmiddleware,createLot)
router.get("/",getAllLots)
router.get("/:id",getLotInfo)
router.put("/:id",authmiddleware,updateLot)
router.delete("/:id",authmiddleware,deleteLot)

export default router
