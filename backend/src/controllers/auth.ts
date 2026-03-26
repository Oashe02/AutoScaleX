import authenticate from "../services/auth"

const authservice = new authenticate()

export const register = async (req:any,res:any)=>{
    try {
        const {name,password} = req.body
        const user = await authservice.register(name,password)
        return res.status(201).json({message:"user register ho gaya",user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}