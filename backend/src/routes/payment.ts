import express from "express"
import {processPayment,fetchPayments,fetchSinglePmt,processRefund} from "../controllers/payment"
import authmiddleware from "../middleware/auth"

const router = express.Router()

router.post("/",authmiddleware,processPayment)
router.get("/invoice/:invoiceId",authmiddleware,fetchPayments)
router.get("/:id",authmiddleware,fetchSinglePmt)
router.put("/refund/:id",authmiddleware,processRefund)

export default router
