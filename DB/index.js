import mongoose from "mongoose";


console.log("working")
const connectDB =async()=>{
    try {
        console.log("is connected")
        const connection=await mongoose.connect("mongodb+srv://sanjay:sanju18cj@cluster0.ruhszbw.mongodb.net/")
        console.log("is connected")
    } catch (err) {
        console.log(err)
    }
}

export default connectDB