const asyncHandle= require("express-async-handler")
const User= require("../model/userModel")
const jwt= require("jsonwebtoken")

const protectedRoute = asyncHandle(async (req, res, next) =>{
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      // Get Token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify Token
      const decoded= jwt.verify(token, process.env.JWT_SECRET)

      req.user= await User.findById(decoded.id).select('-password')
    }catch(err){

      console.log(err.message)
      res.status(401)
      throw new Error("No Token Auth")
    }
  }

  if(!token){
    res.status(401)
    throw new Error("No Token Auth")
  }
  next()
})

module.exports = protectedRoute