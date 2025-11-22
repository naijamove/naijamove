import { model, models, Schema } from "mongoose";


const bookTripSchema  = new Schema ({
    bookingId:{
        type:String,
        required:true
    },
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
    farePrice:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["pending","successful","failed"],
        default:"pending",
        required:true
    },
    transactionId:{
        type:String,
        default:null
    },
    date:{
        type:Date,
        required:true
    },
  },
  { timestamps: true }

)


const BookTrip = models.BookTrip || model("BookTrip",bookTripSchema)
export default BookTrip