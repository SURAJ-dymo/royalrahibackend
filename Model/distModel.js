const mongoose=require("mongoose");
const distSchema=new mongoose.Schema({
    dname:{
        type:String,
        required:true
    },
   
    
})

const Dist=new mongoose.model("dist",distSchema);


module.exports=Dist;