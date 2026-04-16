import express from "express"
import {findslot,getstats,checkdemand} from "../controllers/allocation"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.get("/find",authmiddleware,findslot)
router.get("/stats/:lotId",getstats)
router.get("/demand/:lotId",checkdemand)

export default router
