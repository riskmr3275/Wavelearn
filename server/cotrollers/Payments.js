const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const { courseEnrollment } = require("../Mail/Template/courseEnrollmentEmail")
const { default: mongoose } = require("mongoose")
const { use } = require("express/lib/router")


// capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    try {
        // getCourse id and userId         
        const { course_id } = req.body
        const userId = req.body.id
        // validate course id
        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid course id"
            })
        }
        // check valid course detail
        let course;
        try {
            course = await Course.findById(course_id)
            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: "could find the course"
                })
            }
        } catch (error) {
            console.log("error detect while finding the course", error);
            return res.status(400).json({
                success: false,
                message: "server error while finding the course"
            })
        }
        // user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);//  just coverting from strong to  object id
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: "Student Already Registered"
            })
        }
        // create order
        const amount = course.price;
        const currency = "INR"

        // creating options for razor pay payment
        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: courseId,
                userId
            }
        }

        try {
            // initoate payment using razorpay
            const paymentResponse = await instance.orders.create(options)
            console.log(paymentResponse);
            // return response
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "payment could not be initiate"
            })
        }
    } catch (error) {
        console.log("errro occure from", error);
        return res.status(400).json({
            success: false,
            message: "Server error from payment page",
            error: error.message
        })
    }
}



exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}













































// exports.verifySignature = async (req, res) => {
//     try {
//         // create webhooksecerte
//         const webhooksecret = "12345678";
//         // fetch signatiure key that coming from the razorpay webhook as a response,ye secrte key ham razor pay me 
//         const signature = req.headers["x-razorpay-signature"]//ye razorpay ka template hai predefiend

//         // jab razorpay se response aata hai toh for security reason ese encrypt kar dete hai kuch algorithm ke through yaha pe "sha256" hai
//         // toh hame ese apne defiend "webhooksecerate" se match krne ke liye hame bhi ese decrypt krna hoga usi algorihtm ke through 
//         // kyuki hame pta hai agar koi key ek bar incrypt krne ke bad use decrpyt nai kar sakte
//         // thats why we use it toh uske liye teen steps hai given below
//         // agar samajh me na aaaye toh stress na do

//         const shasum = crypto.createHmac("sha256", webhooksecret)
//         // convert the string to object
//         shasum.update(JSON.stringify(req.body));//hame esestring formate me convrt krna hai
//         const digest = shasum.digest("hex")
//         if (signature === digest) {
//             console.log("Payment is authirised");
//             // fulfill the action
//             // find the courses and enroll the student in it
//             const { courseId, userId } = req.body.payload.payment.entity.notes//ye predefind hai razorpay ki oor se ki tune jo order create krne
//             // ke bad response ke rup me notes me userId and coursId usko ham es nested formate me access kar rhe honge
//             try {
//                 const enrolledCourse = await Course.findByIdAndUpdate({ _id: courseId }, { $push: { studentsEnrolled: courseId } }, { new: true });
//                 if (!enrolledCourse) {
//                     return res.status(400).json({
//                         success: false,
//                         message: "course not found"
//                     })
//                 }
//                 console.log(enrolledCourse);
//                 // find the student and the course to their enrolled course list
//                 const enrolledStudent = await User.findByIdAndUpdate({ _id: userId }, { $push: { courses: courseId } }, { new: true })
//                 console.log(enrolledStudent);
//                 // send the mail to the user 
//                 const emailResponse = await mailSender(enrolledStudent.email, "Congratulations from the Wavelearn", "Congratulations, you are onboareded into the new corse that you purchase")
//                 console.log(emailResponse);
//                 return res.status(200).json({
//                     success: true,
//                     message: "Signature verifieda and course added into the accout please logged in and start learning"
//                 })

//             } catch (error) {
//                 console.log(error);
//                 return res.status(400).json({
//                     success: false,
//                     message: "Signature not matched"
//                 })
//             }

//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             success: false,
//             message: "server errror",
//             error: error.message
//         })
//     }
// }