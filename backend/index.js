const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// mongoose.connect(
//   "",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connection established!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("MongoDB connection established!");
// });

const flowRouter = require("./routes/flowRoute");
app.use("/flow", flowRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
