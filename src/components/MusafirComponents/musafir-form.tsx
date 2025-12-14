"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useEffect, useState } from "react"
import { schoolsAndDestination, typeSchoolAndLocations } from "@/app/utils/schoolAndDestinationsData"
import { Checkbox } from "../ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { useMutation } from "@tanstack/react-query";
import Script from "next/script";
import { useModalStore } from "@/store/useModalStore";



const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  surname: z.string().min(2, {
    message: "surname must be at least 2 characters.",
  }),
  email: z.email({message:"enter a valid email address"}),
  phoneNumber:z.string().min(10,
    {message:"incomplete mobile phone number"}),
    school:z.string().min(1,{
      message:"please select your school"
    }),
    destination:z.string().min(1,{message:"please select your destination"}),
    emergencyContact:z.string().min(10,{
      message:"imcomplete phone number"
    }),
    emergencyName:z.string().min(1,{
      message:"Field can't be empty"
    }),
    bigLuggage: z.enum(["yes", "no",], {
      message: "Please select yes or no",
    }),
})

const extendFormSchema = formSchema.extend({
  farePrice:z.number(),
})
type formDetails = z.infer<typeof extendFormSchema>

export function MusafirForm() {
  const [formDetails,setFormDetails] = useState<formDetails>({
    firstName: "",
    surname:"",
    email:"",
    phoneNumber:"",
    school:"",
    destination:"",
    emergencyName:"",
    emergencyContact:"",
    bigLuggage:"no",
    farePrice:0

  })
  const [availableDestinations,setAvailableDestinations] = useState<string[] | []>([])
  const [farePrice,setFarePrice] = useState<number>(0)
 const {openModal} = useModalStore()
  const [bigLugCheck,setBigLugCheck] = useState<"yes" | "no">()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: "",
          surname:"",
          email:"",
          phoneNumber:"",
          school:"",
          destination:"",
          emergencyName:"",
          emergencyContact:"",
          bigLuggage:"no",

        },
      })
     
      const mutation = useMutation({
        mutationFn:handleFormSubmit,
        onSuccess:(data)=>{
console.log("successful");
console.log(data);
if (data.success) {
  const config = {
    public_key: process.env.NEXT_PUBLIC_FW_PUBLIC_KEY as string,
    tx_ref: `trx-${data.data.bookingId}`,
    amount: farePrice,
    currency: "NGN",

    customer: {
      email: data.data.email,
      name: data.data.firstName,
      phone_number: data.data.phoneNumber,
      bookingId:data.data.bookingId
    },

    meta: {
      bookingId:data.data.bookingId,
    },

    // 1923206313
    customizations: {
      title: "Transport Booking",
      description: "Payment for booking",
      logo: "https://res.cloudinary.com/dg9l9yvxu/image/upload/v1763723706/naijamove_ernsyw.jpg",
    },

    callback: async(response: any) => {
      console.log("Payment response:", response);

      const res = await fetch("/api/book-trip/payment/verify",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({transaction_id:response.transaction_id, tx_ref:response.tx_ref})
      })
      const verifyResponse = await res.json()

      console.log(verifyResponse);
      if (verifyResponse.success) {
        openModal("you have successfully booked a trip,a mail has been sent to your email address")
        if (window.FlutterwaveCheckout) {
          window.FlutterwaveCheckout.close();
        }
      }



      

    },

    onclose: () => {
      console.log("Payment closed");
    },
  };


  window.FlutterwaveCheckout(config);
}

else{
  alert("unable to complete request")
}


        },
        onError:(err)=>{
          console.log(err);
          
console.log("something went wrong");

        }
      })



      // Flutter wave config
const name = "Ade"
const email = "aadebesta@gmail.com"





async function handleFormSubmit(formDetails:Partial<formDetails>) {
  const dateTime =  new Date()

  const res = await fetch("/api/book-trip/initiate",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({...formDetails,farePrice:farePrice,bookingId:uuidv4(),date:dateTime})
  })


  const response = await res.json()
  return response
}
    



      function onSubmit(values: z.infer<typeof formSchema>) {

        const id = uuidv4()
        mutation.mutate({...values})
 
       
       
       
        
      }
      
      
  const school = form.watch("school")
const destination = form.watch("destination")
const bigLuggage = form.watch("bigLuggage")



useEffect(()=>{
if (bigLuggage == "yes") {
  setFarePrice(prev => prev + 600)
  setBigLugCheck("yes")
}
else if (bigLuggage == "no" && bigLugCheck == "yes") {
  setFarePrice(prev => prev - 600)
  setBigLugCheck("no")
  
}


},[bigLuggage])
useEffect(()=>{

  form.resetField("bigLuggage")
  setBigLugCheck("no")
// for futa
  if (school == "FUTA") {
    if (destination == "Ibadan") {
      setFarePrice(4800)
      return
      
    }else if (destination == "Lagos") {
      setFarePrice(9800)
      return
    }
    else if(destination == "Osogbo"){
      setFarePrice(4300)
      return

    }
      
      setFarePrice(0)
      return
    }
    //  FOR PSSA AKURA
    else if (school == "PSSA AKURE") {
      if (destination == "Ibadan") {
        setFarePrice(6500)
        return
        
      }else if (destination == "OUI") {
        setFarePrice(5000)
        return
      }
      setFarePrice(0)
      return
      
    }
    // For fuoye 
   else if (school == "FUOYE") {
    if (destination == "Oye-Ekiti - Ibadan(Premium Ride)") {
      setFarePrice(10600)
    }
    else if (destination == "Oye-Ekiti - Ibadan(Regular Ride)") {
      setFarePrice(8700)
      
    }
    else if (destination == "Ikole - Ibadan(Premium Ride)") {
      setFarePrice(11600)
      
    }
    else if (destination == "Ikole - Ibadan(Regular Ride)") {
      setFarePrice(9700)
      
    }
    else if (destination == "Oye - Lagos(Premium Ride)") {
      setFarePrice(15000)
      
    }
    else if (destination == "Oye - Lagos(Regular Ride)") {
      setFarePrice(12500)
      
    }
    else if (destination == "Ikole - Lagos(Premium Ride)") {
      setFarePrice(16000)
      
    }
    else if (destination == "Ikole - Lagos(Regular Ride)") {
      setFarePrice(13500)
      
    }
    
    else{
      setFarePrice(13500)

    }
    
   }
    // for Osun 
    else if (school == "Osun") {
      if (destination == "Ikole") {
        setFarePrice(7000)
      }else if (destination == "Oye") {
      setFarePrice(6000)
      
      
    }
    else{
      setFarePrice(0)
    }


  }
  else if (school == "LAUTECH") {
    if (destination == "Ibadan") {
      setFarePrice(2900)
    }else if (destination == "Oyo") {
    setFarePrice(1900)
    
  }
  }

  else{
    setFarePrice(0)
  }


},[school,destination])
useEffect(()=>{

  if (!school) {
    return
  }
        const filterDestination:typeSchoolAndLocations = schoolsAndDestination.find(item => item.school == school) as typeSchoolAndLocations

        // console.log(,"school");

        setAvailableDestinations([...filterDestination.destinations])
      
},[school])
  return (
    <>
    {/* flutter wave script */}
 <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="lazyOnload"
      />

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="enter your first name" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        {/* surname */}
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input
                placeholder="enter your surname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="enter your email address" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        {/* phone number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="number" 
              inputMode="numeric"
                placeholder="enter your phone number" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />


{/* School */}
<FormField
  control={form.control}
  name="school"
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>Pick up Location</FormLabel>
      <Select 
        onValueChange={field.onChange}
       defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your school" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {schoolsAndDestination.map((item,index)=>{

            return (
             <SelectItem key={index} value={item.school}>{item.school}</SelectItem>
            )
          })}
          {/* <SelectItem value="nigeria">Nigeria</SelectItem>
          <SelectItem value="ghana">Ghana</SelectItem>
          <SelectItem value="kenya">Kenya</SelectItem> */}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>


{/* Dropdown of Destination */}

<FormField
  control={form.control}
  name="destination"
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>Select Your Destination</FormLabel>
      <Select 
      onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your destination" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {availableDestinations.length > 0 ? availableDestinations.map((item,index)=>{

            return (
             <SelectItem key={index} value={item}>{item}</SelectItem>
            )
          }) : (
            <SelectItem value={"null"}>no destinations</SelectItem>
          )}
          {/* <SelectItem value="nigeria">Nigeria</SelectItem>
          <SelectItem value="ghana">Ghana</SelectItem>
          <SelectItem value="kenya">Kenya</SelectItem> */}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>


        {/* emergency contact */}
        <FormField
          control={form.control}
          name="emergencyContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact</FormLabel>
              <FormControl>
                <Input 
                inputMode="numeric"
                type="number"
                placeholder="phone number" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        {/* emergency name */}
        <FormField
          control={form.control}
          name="emergencyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Name</FormLabel>
              <FormControl>
                <Input 
              
                placeholder="emergency name" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
          />



<FormField
  control={form.control}
  name="bigLuggage"
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>Do you have Big luggage?</FormLabel>

      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value}
          className="flex flex-col space-y-2"
          >
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="yes" />
            </FormControl>
            <FormLabel className="font-normal">Yes</FormLabel>
          </FormItem>

          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="no" />
            </FormControl>
            <FormLabel className="font-normal">No</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>

      <FormMessage />
     <div className="text-red-500 font-semibold">
      <span>Note</span>: selecting "Yes" attracts an extra fee of ₦600
     </div>
    </FormItem>
  )}
/>

<div>
  <div className="text-lg">Fare Price: <span className="font-semibold">₦{farePrice}</span> </div>
</div>


        {/* submit button */}
        <div className="flex items-center justify-center ">
        <Button
        disabled={mutation.isPending ? true : false}
        className="w-[30%]" type="submit">{mutation.isPending ? "loading" :"Submit"}</Button>

        </div>
      </form>
    </Form>
          </>
  )
}