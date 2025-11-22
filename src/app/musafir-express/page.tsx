import { MusafirForm } from "@/components/MusafirComponents/musafir-form"
import Image from "next/image"
import Link from "next/link"


const Page = () => {
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

          {/* <div className="text-lg text-end ">
  Already booked trip? <Link className="font-semibold" href="/musafir-express/booking-info" >confirm your booking</Link>
</div> */}
          <h1 className="font-bold md:text-[1.2rem] text-[1rem]">MUSAFIR EXPRESS - BOOK A TRIP</h1>
            </section>
        <MusafirForm/>
        </section>

    </div>
  )
}

export default Page