import express from "express"
import cors from "cors"
import authroutes from "./routes/auth"
import parkinglotroutes from "./routes/parkinglot"
import slotroutes from "./routes/slot"
import bookingroutes from "./routes/booking"
import reservationroutes from "./routes/reservation"
import paymentroutes from "./routes/payment"
import invoiceroutes from "./routes/invoice"
import allocationroutes from "./routes/allocation"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/start",(req,res)=>{
    res.status(200).json({message:"start ho gaya"})
})

app.use("/api/auth",authroutes)
app.use("/api/parkinglot",parkinglotroutes)
app.use("/api/slot",slotroutes)
app.use("/api/booking",bookingroutes)
app.use("/api/reservation",reservationroutes)
app.use("/api/payment",paymentroutes)
app.use("/api/invoice",invoiceroutes)
app.use("/api/allocation",allocationroutes)

app.use((err:any,req:any,res:any,next:any)=>{
    console.error(err.stack)
    res.status(500).json({error:"error"})
})

export default app