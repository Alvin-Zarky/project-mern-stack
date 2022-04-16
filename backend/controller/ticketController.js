const asyncHandler= require("express-async-handler")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcryptjs")
const User = require("../model/userModel")
const Ticket= require("../model/ticketModel")

const getTicket= asyncHandler(async (req, res) =>{
  
  // find the user in mongoDb from id jwt (req.user.id)
  const user= await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error('No Auth User')
  }
  const ticket= await Ticket.find({user: req.user.id})
  res.status(200).json(ticket)
})

const createTicket= asyncHandler(async (req, res) =>{

  const {product, description} = req.body
  const user= await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error('No Auth User')
  }
  if(!product || !description){
    res.status(400)
    throw new Error('Please input the field')
  }
  const ticket= await Ticket.create({
    product,
    description,
    user: req.user.id
  })
  res.status(200).json(ticket)
})

const getSingleTicket= asyncHandler(async (req, res) =>{
  
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('No Authorize')
  }
  const singleTicket= await Ticket.findById(req.params.id)
  
  if(!singleTicket){
    res.status(404)
    throw new Error('No Ticket Data')
  }
  if(singleTicket.user.toString() !== req.user.id){
    res.status(404)
    throw new Error('Not authorize')
  }

  res.status(200).json(singleTicket)
})

const updateTicket= asyncHandler(async (req, res) =>{
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('No Authorize')
  }
  const singleTicket= await Ticket.findById(req.params.id)
  
  if(!singleTicket){
    res.status(404)
    throw new Error('No Ticket Data')
  }
  if(singleTicket.user.toString() !== req.user.id){
    res.status(404)
    throw new Error('Not authorize')
  }

  const updateTicket= await Ticket.findByIdAndUpdate(req.params.id, req.body, {new:true})

  res.status(201).json(updateTicket)
})

const deleteTicket= asyncHandler(async (req, res) =>{

  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('No Authorize')
  }
  const singleTicket= await Ticket.findById(req.params.id)
  
  if(!singleTicket){
    res.status(404)
    throw new Error('No Ticket Data')
  }
  if(singleTicket.user.toString() !== req.user.id){
    res.status(404)
    throw new Error('Not authorize')
  }
  await singleTicket.remove()

  res.status(201).json({success:true})
})

module.exports= {
  getTicket,
  getSingleTicket, 
  createTicket,
  updateTicket,
  deleteTicket
}