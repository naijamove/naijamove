import { connectToDb } from "@/db/connectDb";
import BookTrip from "@/models/book-trip";

import { NextRequest, NextResponse } from "next/server";



export const POST = async(req:NextRequest)=>{
const details = await req.json()

const dbConnect = await connectToDb()
if (!dbConnect.success) {
    return NextResponse.json({success:false,message:"en error occured, please try again"})
}

try {
    const createTrip = await BookTrip.create({...details,paymentStatus:"pending",paymentRef:null})

if (!createTrip) {
    return NextResponse.json({success:false,message:"an error occured"})
}
else{

    return NextResponse.json({success:true,message:"added info to db",data:createTrip})
}

} catch (error) {
    console.log(error);
    
    return NextResponse.json({success:false,message:"something went wrong"})
    
}






}