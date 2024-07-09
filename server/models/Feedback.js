const { type } = require("express/lib/response")
const mongoose=require("mongoose")

const feedbackSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phoneNo:
    {
        type:Number,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    }

})

module.exports=mongoose.model("Feedback",feedbackSchema)
