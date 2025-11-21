"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

import { Button } from "@/components/ui/button"
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
    bigLuggage: z.enum(["yes", "no"], {
      message: "Please select yes or no",
    }),
})

const extendFormSchema = formSchema.extend({
  amount:z.string(),
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
    amount:""

  })
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
     



      // Flutter wave config
const name = "Ade"
const email = "aadebesta@gmail.com"
      const config = {
        public_key:process.env.NEXT_PUBLIC_FW_PUBLIC_KEY as string,
        tx_ref: Date.now().toString(),
        amount: 500,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          name,
          email,
          phone_number: '08144835189',
        },
        customizations: {
          title: 'Book Ride',
          description: 'Payment for ride',
          logo: 'https://res.cloudinary.com/dg9l9yvxu/image/upload/v1763723706/naijamove_ernsyw.jpg',
        },
      };


      const fwConfig = {
        ...config,
        text: 'Pay for ride!',
        callback: (response:FlutterWaveResponse) => {
           console.log(response);
          closePaymentModal() 
        },
        onClose: () => {
console.log("model close");


        },
      };



      useEffect(()=>{
        const dataTime = new Date()
        console.log(dataTime);
      },[])
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
    
        console.log(values)

        
      }
  const [availableDestinations,setAvailableDestinations] = useState<string[] | []>([])


  const school = form.watch("school")


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
   {/* <div>
   <FlutterWaveButton {...fwConfig} />
   </div> */}
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
      <FormLabel>Schools</FormLabel>
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
      <span>Note</span>: selecting "Yes" attracts an extra fee of #600
     </div>
    </FormItem>
  )}
/>



        {/* submit button */}
        <div className="flex items-center justify-center ">
        <Button className="w-[30%]" type="submit">Submit</Button>

        </div>
      </form>
    </Form>
          </>
  )
}