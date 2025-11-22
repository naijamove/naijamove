import { connectToDb } from "@/db/connectDb";
import BookTrip from "@/models/book-trip";

import { NextRequest, NextResponse } from "next/server";



export const POST = async(req:NextRequest)=>{
const { transaction_id, tx_ref }= await req.json()
const cleanId = tx_ref.split("trx-")[1]

console.log("transaction id", transaction_id);

const dbConnect = await connectToDb()
if (!dbConnect.success) {
    return NextResponse.json({success:false,message:"en error occured, please try again"})
}




try {
    const verifyRes = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.FW_SECRET_KEY}`,
          },
        }
      );

      const verifyData = await verifyRes.json();
      console.log(verifyData);
      

      if (verifyData.status !== "success") {
        return Response.json(
          { success: false, message: "Payment verification failed" },
          { status: 400 }
        );
      }

      
      console.log(verifyData.data.id);
      
      const booking = await BookTrip.findOneAndUpdate(
        {bookingId:cleanId},
        {
            transactionId:verifyData.data.id,
            paymentStatus:"successful",
            paymentRef:verifyData.data.flw_ref
        },
        {new:true}
    
    )
    console.log(booking);
    
      return NextResponse.json({success:true,data:verifyData,updatedData:booking})
    
} catch (error) {
    console.log(error);
    
    return NextResponse.json({
        message:"something went wrong",
        success:true,
    })
}

}