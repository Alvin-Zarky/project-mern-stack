const mongoose= require("mongoose")

const connectionDb= async () =>{
  try{
    const apiDb= process.env.DATABASE
    const con = await mongoose.connect(apiDb)
    console.log(`Connection is success ${con.connection.host}`.green.underline)
  }catch(err){
    console.log(`Connection error ${con.connection.host}`.red.underline.bold)
  }
}

module.exports= connectionDb