const mongoose=require("mongoose");
const imagefSchema=new mongoose.Schema({
    iname:{
        type:String,
        required:true
    },
    idesc:{
      type:String,
      required:true
  },
  ilink:{
    type:String,
    required:true
},

    imagesf: [
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
    
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const Imagef=new mongoose.model("imagesf",imagefSchema);


module.exports=Imagef;