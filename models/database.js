const mongoose = require("mongoose");
const { catchAsynchErrors } = require("../middlewares/catchAsynchErrors");

exports.connectDatabase = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connection Established!");
  } catch (error) {
    if (
      error.name === "MongoParseError" &&
      error.message.includes(
        "Invalid scheme, expected connection string to start with"
      )
    ) {
      console.error(`Invalid Database URL: ${process.env.MONGODB_URL}`);
    }
  }
};
