const express=require('express');

const userRoute=require('./Routes/userRoute');
const imageRoute=require('./Routes/imageRoute');
const imagefRoute=require('./Routes/imagefRoute');
const categoryRoute=require("./Routes/categoryRoute");
const distRoute=require("./Routes/distRoute");
const branchRoute=require("./Routes/branchRoute");
const loadsRoute=require("./Routes/loadRoute");
const offerRoute=require("./Routes/offerRoute");

const cors=require("cors");
const body_parser=require("body-parser");
const cookie_parser=require("cookie-parser");
const err=require("./Middelwares/error")

const fileUpload = require("express-fileupload");



const app=express();


app.use(express.json());
app.use(cors())
app.use(body_parser.urlencoded({extended:true}));
app.use(cookie_parser());
app.use(fileUpload());





app.use("/api/v1",userRoute)
app.use("/api/v1",categoryRoute)
app.use("/api/v1",distRoute)
app.use("/api/v1",branchRoute)
app.use("/api/v1",imageRoute)
app.use("/api/v1",imagefRoute)
app.use("/api/v1",loadsRoute)
app.use("/api/v1",offerRoute)

app.use(err);
module.exports=app;