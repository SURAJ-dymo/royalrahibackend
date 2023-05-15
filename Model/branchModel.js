const mongoose=require("mongoose");
const branchSchema=new mongoose.Schema({
    bnumber:{
        type:Number,
        required:true
    },
    tname:{
        type:String,
        required:true
    },
    bDesc:{
        type:String,
        required:true
    },
    blink:{
        type:String,
        required:true
    },
    bDist:{
        type:String,
        required:true
    },
   
   
})

const Branch=new mongoose.model("branch",branchSchema);


module.exports=Branch;