import express from "express"
import cors from "cors"
import authroutes from "./routes/auth"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/start",(req,res)=>{
    res.status(200).json({message:"start ho gaya"})
})

app.use("/api/auth",authroutes)

app.use((err:any,req:any,res:any,next:any)=>{
    console.error(err.stack)
    res.status(500).json({error:"error"})
})

export default app