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
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5* 60
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