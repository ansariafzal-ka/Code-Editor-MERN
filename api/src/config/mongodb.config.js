const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("an error occured while connecting the mongodb : ", error);
  }
};

module.exports = connectDb;
