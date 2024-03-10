
import mongoose from "mongoose"
import express from "express"
const app = express()

mongoose.connect("mongodb://localhost:27017/",).then((result)=>{
    console.log("RUNNING");
}).catch((err)=>{
console.log(err);
})

app.use(express.json())
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    rollno:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})
const User = mongoose.model("User",userSchema);
const chatSchema= new mongoose.Schema({
    message:{
        type: String,
        required: true,
    },
    
})

const Chat = mongoose.model("Chat",chatSchema);

app.post("/create_user",async(req,res)=>{
    
    const {name,rollno,password}=(req.body);
    
    if(!name||!rollno||!password){
      return res.status(422).json({error:"fill all forms above"})
    }
    try {
        const legit_user=await User.findOne({rollno:rollno})
         if(rollno===legit_user.rollno) return res.status(422).json({error:"this all user already exist"})

       const user_data= new User({name,rollno,password})
        const userReg=await user_data.save() 
        console.log(userReg)
    } catch (err) {
        return res.status(500).json({error:"something went wrong"})
    }  
})

app.get("/login",async(req,res)=>{
    const {rollno,password}=req.body
    const current_user=await User.findOne({rollno:rollno})
    if(!rollno||!password){
        return res.status(422).json({error:"fill all forms above"})
      }
    try {
    if(!current_user) return res.status(422).json({error:"invalid rollno"})
    if(current_user.password==password) return res.status(200).json({error:"valid user"})
        
    } catch (error) {
        console.log(error)
    }
})

app.post("/dashboard",async(req,res)=>{
    const msg=req.body
    console.log(msg)
    if(!msg){
        return res.status(422).json({error:"fill all forms above"})
      }
    const msg_data= new Chat(msg)
    const msg_save=await msg_data.save() 
    console.log(msg_save)
})

app.get("/dashboard",async(req,res)=>{
    //get data of rollno somehow
    Chat.find({}).then(msg=> res.json(msg)).catch(err=>console.log(err))

})
//rollno subject fetching 
//calender
app.listen(3090,()=>{
    console.log("RUNNING AT 3090")
})