const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender");
const {otpMail}=require("../Mail/Template/Otpmail")


const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: [{
    type: String,
    required: true
  }],
  // created attribute is help to remove the otp after getration of ten minute
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 10* 60
  }
})

async function sendVerificationEmail(email,otp)
{
  try {
    const mailResponse=await mailSender(email,"Verification Mail from WaveNotion",otpMail(otp));
     
    console.log("Email sent Successfully haha hah jiijij",mailResponse);
  } catch (error) {
    console.log("Error occured while sending the email",error);
  }
}
// calling the pree middleware before creating the account in the database 
otpSchema.pre("save",async function(next){
  if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
  next();
})


module.exports = mongoose.model("OTP", otpSchema) 






//1. otpSchema.pre("save", async function(next) {...}):
    // This is a pre-save middleware that runs before the document is saved to the database.
    // The async function(next) allows for asynchronous operations within the middleware.
    
// 2. (this.isNew) { ... }:
  // The condition this.isNew checks if the document is being created for the first time (i.e., it's a new document).