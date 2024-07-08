const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
        console.error("MONGODB_URL environment variable is not defined.");
        process.exit(1);
    }

    mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Mongodb connected successfully");
    })
    .catch((error) => {
        console.error("Mongodb connection failure");
        console.error(error);
        process.exit(1); // Exit the process with failure
    });
};
