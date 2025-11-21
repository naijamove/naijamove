import { MusafirForm } from "@/components/MusafirComponents/musafir-form"
import Image from "next/image"


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
          <h1 className="font-bold text-[1.3rem]">MUSAFIR EXPRESS - BOOK A RIDE</h1>
            </section>
        <MusafirForm/>
        </section>
    </div>
  )
}

export default Page