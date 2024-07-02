const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    const mongoUri = process.env.MONGODB_URL;

    if (!mongoUri) {
        console.error("MONGODB_URL environment variable is not defined.");
        process.exit(1);
    }

    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Mongodb connected successfully");
    })
    .catch((error) => {
        console.error("Mongodb connection failure");
        console.error(error);
        process.exit(1); // Exit the process with failure
    });
};
