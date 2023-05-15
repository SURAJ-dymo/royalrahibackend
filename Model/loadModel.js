const mongoose=require("mongoose");
const loadsSchema=new mongoose.Schema({


    lnumber:{
        type:String,
        default:1
    },
    loads:{
        type:Boolean,
        default:false
    },
   
    
})

const Loads=new mongoose.model("loads",loadsSchema);


module.exports=Loads;