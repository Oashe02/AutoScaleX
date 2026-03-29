import User from "../models/user"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const jwtsecret = process.env.JWT || "secrethain"

class authservice {
    async register(name:string,email:string,phone:number,pass:string,vehicleNumber:string){
        const check = await User.findOne({email})
        if(check){
            throw new Error("already exists")
        }
        const hashed = await bcrypt.hash(pass,10)
        const newuser = await User.create({name,email,phone,password:hashed,vehicleNumber})
        return newuser
    }
    async login(email:string,pass:string){
        const usr = await User.findOne({email})
        if(!usr){
            throw new Error("not found")
        }
        const isMatch = await bcrypt.compare(pass,(usr as any).password)
        if(!isMatch){
            throw new Error("wrong password")
        }
        const tkn = jwt.sign({id:usr._id,role:(usr as any).role},jwtsecret,{expiresIn:"7d"})
        return {usr,tkn}
    }
}

export default authservice