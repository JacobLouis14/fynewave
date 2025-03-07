const mongoose = require("mongoose");

const mongoConnectionString = process.env.DATABASEURL;

const dbConnectionHandler = async () => {
  try {
    const db = await mongoose.connect(mongoConnectionString);
    if (db) {
      console.log("Database connection successfull");
    }
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { dbConnectionHandler };
