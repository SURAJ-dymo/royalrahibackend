
// require("dotenv").config();
// const mongoose=require("mongoose");

// const DB_OPTIONS={
//   dbName:process.env.DBNAME,
//   user:process.env.DBUSERNAME,
//   pass:process.env.DBPASSWORD,
//   authSource:process.env.DBAUTHSOURCE,
//   useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// }
// const Connection=()=>{
//     mongoose.connect(process.env.DB_URI,DB_OPTIONS).then(()=>{
//           console.log("data base connected successfully")
//     }).catch((err)=>{
//          console.log("something went wrong on database")
//     })
// }

// module.exports=Connection;


require("dotenv").config();
const mongoose=require("mongoose");


const Connection=()=>{
    mongoose.connect(process.env.DB_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useCreateIndex:true
  }).then(()=>{
          console.log("data base connected successfully")
    }).catch((err)=>{
         console.log("something went wrong on database")
    })
}

module.exports=Connection;