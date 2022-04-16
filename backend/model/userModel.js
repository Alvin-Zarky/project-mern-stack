const mongoose= require("mongoose")

let userSchema= mongoose.Schema({
  name:{
    type:String,
    require: [true, 'Add value to a name']
  },
  email:{
    type:String,
    require:[true, 'Add value to an email'],
    unique:true
  },
  password:{
    type:String,
    require:[true, 'Add value to a password']
  },
  isAdmin:{
    type:Boolean,
    require:true,
    default:false
  }
}, {timestamps: true})

module.exports= mongoose.model('User', userSchema)