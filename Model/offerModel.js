const mongoose=require("mongoose");
const offerSchema=new mongoose.Schema({
   
    odesc:{
        type:String,
        required:true
    },
    olink:{
        type:String,
        default:""
    },
    
images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
   
})

const Offer=new mongoose.model("offer",offerSchema);


module.exports=Offer;