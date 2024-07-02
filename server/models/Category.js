const mongoose = require("mongoose")
const { describe } = require("node:test")

const categorySchema = new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      description:
      {
        type:String
      },
      course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
      },
})

module.exports=mongoose.model("Category",categorySchema)



// const mongoose = require("mongoose");

// const CategorySchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String
//     },
//     course: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course"
//     },
//     courses: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course"
//     }]
// });

// module.exports = mongoose.model("Tag", CategorySchema);
