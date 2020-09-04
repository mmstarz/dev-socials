const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); // get access string from config file

// connect to database
const connectDB = async () => {
  try {
    // connect() - returns a promise
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    // err object have a message prop
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
