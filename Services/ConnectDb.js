const mongoose = require("mongoose");

const connectDb = async (uri) => {
  try {
    await mongoose.connect(uri, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("monogoose connected successfully");
  } catch (error) {
    console.log("error occur while connecting with mongo Db", error);
  }
};

module.exports = connectDb;
