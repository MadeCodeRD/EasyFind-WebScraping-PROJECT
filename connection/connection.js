const mongoose = require("mongoose");

const connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODBURI);

        console.log("Connected to MongoDB");

        return conn;
    } catch (error) {
        console.log(error)
    }
}
    
module.exports = connection;
    