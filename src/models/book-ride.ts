import { model, models, Schema } from "mongoose";


const bookRideSchema  = new Schema ({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    school: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyName: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContact: {
      type: String,
      required: true,
      trim: true,
    },
    bigLuggage: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    date:{
        type:Date,
        required:true
    }
  },
  { timestamps: true }

)


const BookRide = models.BookRide || model("BookRide",bookRideSchema)
export default BookRide