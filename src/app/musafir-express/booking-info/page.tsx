"use client"
import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useModalStore } from '@/store/useModalStore'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useState } from 'react'

export interface BookingInfo {
    firstName: string;
    surname: string;
    email: string;
    phoneNumber: string;
    school: string;
    destination: string;
    bigLuggage: "yes"| "no";
    farePrice: number;
  }


  const initialBookingState = {
    firstName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    school: "",
    destination: "",
    bigLuggage: "no",
    farePrice: 0,
  };
const page = () => {
    const [formDetails,setFormDetails] = useState({
        paymentRef:""
    })
    const [bookingData,setBookingData] = useState(initialBookingState)
     const {openModal} = useModalStore()

const mutation = useMutation({
    mutationFn:handleFindOne,
    onSuccess:(data)=>{

        if (!data.success) {
            openModal(data.message)
            return
        }

setBookingData(data.data)


    },
    onError:()=>{
console.log("an error occured")
openModal("an error occured")

    }
})


async function handleFindOne  (paymentRef:string){
   

    const res = await fetch("/api/book-trip/booking-info",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({paymentRef:paymentRef})
    })
  
  
    const response = await res.json()
    return response
}

  return (
    <div>
          <section className="lg:w-[50%] md:w-[70%] w-[90%] mx-auto pt-16 pb-16">
            <section className="flex flex-col items-center justify-center my-8">
  
            <div className="w-[200px] h-[200px] relative ">
              <Image 
              fill
              className="absolute w-full h-full inset object cover"
              src={"/naijamove.jpg"} 
              alt="naija move" 
              />
            </div>
              </section>
    
    <div>
          <header className='text-center py-6'>
          <h1 className="font-bold md:text-[1.2rem] text-[1rem]">CHECK BOOKING INFO</h1>
          <p>enter the transaction reference sent to your email after you completed your booking payment</p>
          </header>
        <Input
        value={formDetails.paymentRef}
        onChange={(e)=> setFormDetails({paymentRef:e.target.value})}
        />

<div className='flex justify-center items-center my-8'>
<Button 
className='lg:w-[30%] w-[50%] min-h-[45px]'
disabled ={mutation.isPending ? true : false}
onClick={()=>{

    if (!formDetails.paymentRef) {
        openModal("empty field")
        return
    }
    mutation.mutate(formDetails.paymentRef)
}}
>{mutation.isPending ? <Spinner/> : "Submit"}</Button>
</div>
    </div>




{/* info */}

<section>

{bookingData.email && <div className="space-y-2">
    <span className="block">
  First Name: <strong>{bookingData.firstName}</strong>
</span>

<span className="block">
  Surname: <strong>{bookingData.surname}</strong>
</span>

<span className="block">
  Email: <strong>{bookingData.email}</strong>
</span>

<span className="block">
  Phone Number: <strong>{bookingData.phoneNumber}</strong>
</span>

<span className="block">
  School: <strong>{bookingData.school}</strong>
</span>

<span className="block">
  Destination: <strong>{bookingData.destination}</strong>
</span>

<span className="block">
  Big Luggage: <strong>{bookingData.bigLuggage }</strong>
</span>

<span className="block">
  Fare Price: <strong>{bookingData.farePrice}</strong>
</span>

</div>}
</section>
          </section>
      </div>
  )
}

export default page