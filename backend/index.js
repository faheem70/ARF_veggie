const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()
const app = express()
const cookieParser = require('cookie-parser')
const router = require("./routes/userRoute");




const PORT = process.env.PORT || 4000

// mongodb connection

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connect to Databse"))
    .catch((err) => console.log(err));

//schema

app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(cookieParser());
app.use(cors());
app.use(router);


app.listen(PORT, () => console.log("server is running at port :" + PORT));