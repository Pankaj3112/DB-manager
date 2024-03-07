const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

const recordSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dbName: String,
});

const Record = mongoose.model("Record", recordSchema);

module.exports = { Record };
