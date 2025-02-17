const mongoose = require("mongoose");

const ConnectDB = async () => {
    const url = process.env.MONGO_DB_URI;

    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected");
    } catch (err) {
        console.error("Error connecting to Database:", err);
    }
};

module.exports = ConnectDB;
