import mongoose from "mongoose"

const chatSchema= new mongoose.Schema({
    // userData:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // },
    
    message:{
        type: String,
        required: true,
    },
    timeStamp:{
        type:String,
        required:true,
    }
},{timestamps:true})

export default Chat = mongoose.model("Chat",chatSchema);