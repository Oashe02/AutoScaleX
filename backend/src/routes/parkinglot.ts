import express from "express"
import { createlot,getalllots,getlotbyid,updatelot,deletelot } from "../controllers/parkinglot"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/",authmiddleware,createlot)
router.get("/",getalllots)
router.get("/:id",getlotbyid)
router.put("/:id",authmiddleware,updatelot)
router.delete("/:id",authmiddleware,deletelot)

export default router
