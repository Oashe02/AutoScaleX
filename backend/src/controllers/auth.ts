import authservice from "../services/auth"

const auth = new authservice()

export const register = async (req:any,res:any)=>{
    try {
        const {name,email,phone,password,vehicleNumber} = req.body
        const user = await auth.register(name,email,phone,password,vehicleNumber)
        return res.status(201).json({message:"registered",user})
    } catch (err:any) {
        console.log(err)
        return res.status(500).json({message:err.message})
    }
}
export const login = async(req:any,res:any)=>{
    try{
        const {email,password} = req.body
        const data = await auth.login(email,password)
        return res.status(200).json({message:"logged in",data})
    }catch(err:any){
        console.log(err)
        return res.status(401).json({message:err.message})
    }
}