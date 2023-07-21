const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user.route")

// app
const app = express();

// variables
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

// middlewares
app.use(express.json())
app.use(cors({credentials:true}))


// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to sephora shop" });
});
app.use("/api/user",userRoutes)



mongoose
  .connect(uri, { useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`app listen on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
