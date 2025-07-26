const mongoose = require("mongoose");
module.exports = async () => {
  const dbUrl = process.env.MongoDB_URL;
  try {
    if (!dbUrl) {
      throw new Error("MongoDB_URL is not defined in .env file");
    }

    await mongoose.connect(dbUrl);

    console.log("Connected to MongoDB successfully".bold.bgGreen.white);
  } catch {
    (error) => {
      console.error("Error connecting to MongoDB:", error);
    };
  }
};
