const mongoose = require('mongoose');

const ticketSchema= mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'User' //collection users in mongoDb
  },
  product:{
    type:String,
    require: [true, 'Please select the proudct'],
    enum:['Iphone 13','Ipad','Macbook pro'] //list select for form in client
  },
  description:{
    type:String,
    require:[true, 'Please input the detail']
  },
  status:{
    type:String,
    require:true,
    enum:['new','open','close'],
    default:'new'
  }
},{timestamps:true})

module.exports= mongoose.model('Ticket', ticketSchema)