
import mongoose from "mongoose";


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        
        console.log("connect tu DB...")
    }catch(err){
        console.log(err)
    }

}

export default connectDB
