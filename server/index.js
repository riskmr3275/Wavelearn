const express=require("express")
const app=express()

const userRoutes=require("./routes/User")
const profileRoutes=require("./routes/Profile")
const paymentRoutes=require("./routes/Payment")
const courseRoutes=require("./routes/Course")
 
const database=require("./config/database")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const {cloudinaryConnect}=require("./config/cloudinary")
const fileUpload=require("express-fileupload")
const dotenv=require("dotenv")

dotenv.config()
const PORT=process.env.PORT||4000;

// database connect
database.connect()

// middlewares

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow credentials (optional)
    optionsSuccessStatus: 204 // For legacy browser support
}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

// cloudinary connextion
cloudinaryConnect()

// routes
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)

// def general routes
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running.............."
    })
})

app.listen(PORT,()=>console.log(`your server is started on port ${PORT}`))