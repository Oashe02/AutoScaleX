import express from "express"
import {generateinvoice,getmyinvoices,getinvoicebyid} from "../controllers/invoice"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/",authmiddleware,generateinvoice)
router.get("/my",authmiddleware,getmyinvoices)
router.get("/:id",authmiddleware,getinvoicebyid)

export default router
