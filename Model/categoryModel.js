const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    cname:{
        type:String,
        required:true
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
      }
})

const Category=new mongoose.model("categories",categorySchema);


module.exports=Category;