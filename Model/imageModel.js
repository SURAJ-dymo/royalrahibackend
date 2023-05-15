const mongoose=require("mongoose");
const imageSchema=new mongoose.Schema({
    
  designCode:{
    type:Number,
    required:true,
    unique:true
},
  
  iname:{
        type:String,
        default:"clothes"
    },
  idesc:{
      type:String,
      default:"its Royal choice clothe"
  },
  ilink:{
    type:String,
    default:""
},
icat:{
  type:String,
  required:true
},
featured:{
  type:Boolean,
  default:false
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
    
createdAt: {
        type: Date,
        default: Date.now,
      },
})

const Image=new mongoose.model("images",imageSchema);


module.exports=Image;