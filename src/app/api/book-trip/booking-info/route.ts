import { connectToDb } from "@/db/connectDb";
import BookTrip from "@/models/book-trip";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export const POST = async(req:NextRequest)=>{
const {paymentRef} = await req.json()
const dbConnect = await connectToDb()
if (!dbConnect.success) {
    return NextResponse.json({success:false,message:"en error occured, please try again"})
}


try {
    const booking = await BookTrip.findOne({paymentRef})

    if (!booking) {
        return NextResponse.json({success:false,message:"invalid payment reference",data:null})
    }
    console.log(booking);
    return NextResponse.json({success:true,data:{
        firstName:booking.firstName,
        surname:booking.surname,
        email:booking.email,
        phoneNumber:booking.phoneNumber,
        school:booking.school,
        destination:booking.destination,
        bigLuggage:booking.bigLuggage,
        farePrice:booking.farePrice


    }})
    
} catch (error) {
    console.log("em error occured");
    
    return NextResponse.json({success:false,message:"sorry, something went wrong"})

}


}