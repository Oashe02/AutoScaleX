import Parkinglot from "../models/parkinglot"

class parkinglotservice {
    async create(data:any){
        const lot = await Parkinglot.create(data)
        return lot
    }
    async getall(){
        return await Parkinglot.find()
    }
    async getbyid(id:string){
        const lot = await Parkinglot.findById(id)
        if(!lot) throw new Error("not found")
        return lot
    }

    async update(id:string,data:any){
        const lot = await Parkinglot.findByIdAndUpdate(id,data,{new:true})
        if(!lot) throw new Error("not found")
        return lot
    }
    async deletelot(id:string){
        const lot = await Parkinglot.findByIdAndDelete(id)
        if(!lot) throw new Error("not found")
        return lot
    }
}

export default parkinglotservice
