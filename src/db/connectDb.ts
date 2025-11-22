import mongoose from "mongoose"

const MONGO_URL = process.env.MONGO_URL as string
const  DB_NAME = process.env.DB_NAME as string

if (!MONGO_URL) {
    throw new Error("mongo url is unavailable")
}
if (!DB_NAME) {
    throw new Error("db name is unavailable")
}




export const connectToDb = async()=>{

    try {
        mongoose.connect(MONGO_URL,{dbName:DB_NAME})
        console.log("connected successfully");


        return {
            success:true,
            message:"connected to db successfully"
        }
        
    } catch (error) {
        
        // console.log(error);
   
        console.log("an error occured");
        return {success:false,message:"unable to connect to db"}
    

        
    }
    
    }
    

