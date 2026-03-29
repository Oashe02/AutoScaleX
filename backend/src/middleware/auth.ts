import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const secret = process.env.JWT || "secrethain"

const authmiddleware = (req:any,res:any,next:any)=>{
    try{
        const header = req.header("authorization")
        if(!header || !header.startsWith("Bearer ")){
            return res.status(401).json({error:"no token"})
        }
        const tkn = header.split(" ")[1]
        const decoded = jwt.verify(tkn,secret)
        req.user = decoded
        next()
    }catch(e){
        return res.status(401).json({error:"invalid token"})
    }
}

export default authmiddleware
