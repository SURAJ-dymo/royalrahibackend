require("dotenv").config();
const cloudinary = require("cloudinary");
const Connection=require("./Connection/Db");
const app=require("./app");
const mongoose=require("mongoose");


Connection();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
const PORT=process.env.PORT || 6030
const server=app.listen(PORT,()=>{
    console.log("server is runng on port no 8000")
})


