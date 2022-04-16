const bcryptjs = require("bcryptjs")
const jwt= require("jsonwebtoken")
const asyncHandler= require("express-async-handler")
const User = require("../model/userModel")

const registerUser= asyncHandler(async(req, res) =>{
  const {name, email, password}= req.body
  
  if(!name || !email || !password){
    res.status(400)
    throw new Error('Check All Fields')
  }

  // If user exist
  const existUser= await User.findOne({email})
  if(existUser){
    res.status(400)
    throw new Error('User email is already exists')
    // res.json({
    //   message: "User email is already exists"
    // })
  }

  // Hash password
  const salt= await bcryptjs.genSalt(10)
  const hashPassword= await bcryptjs.hash(password, salt)

  // Create a user
  const userCreate= await User.create({
    name,
    email,
    password: hashPassword,
  })
  
  if(userCreate){
    res.status(201)
    res.json({
      _id: userCreate._id,
      name: userCreate.name,
      email: userCreate.email,
      token: generaterToken(userCreate._id)
    })
  }else{
    res.status(400)
    throw new Error('User doesnot exist')
  }

})

const loginUser= asyncHandler(async(req, res) =>{
  const {name,email, password} = req.body
  const user= await User.findOne({email})
  
  if(user && await bcryptjs.compare(password, user.password)){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email:user.email,
      token: generaterToken(user._id)
    })
  }else{
    res.status(401)
    throw new Error('Login Failed')
  }
})

const profileUser = asyncHandler(async(req, res) =>{
  const userJson= {
    id:req.user.id,
    name:req.user.name,
    email: req.user.email
  }
  res.status(201).json(userJson)
})

const generaterToken= (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'})
}

module.exports= { registerUser, loginUser, profileUser }