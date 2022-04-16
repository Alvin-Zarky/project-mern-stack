const asyncHandler= require("express-async-handler")
const jwt= require("jsonwebtoken")

const User= require("../model/userModel")
const Ticket= require("../model/ticketModel")
const Note= require("../model/noteModel")

const getNote= asyncHandler(async(req, res) =>{
  
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(404)
    throw new Error('No Auth Token')
  }
  
  const ticket= await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(404)
    throw new Error('No Ticket Data')
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(404)
    throw new Error('No Authorize')
  }

  const getTicketNote= await Note.find({ticket: req.params.id})
  res.status(200).json(getTicketNote)
})

const postNote= asyncHandler(async(req, res) =>{
  
  const {text}= req.body
  const user= await User.findById(req.user.id)
  if(!user){
    res.status(404)
    throw new Error('No Auth Token')
  }
  
  const ticket= await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(404)
    throw new Error('No Ticket Data')
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(404)
    throw new Error('No Authorize')
  }

  if(!text){
    res.status(401)
    throw new Error('Please input the field')
  }
  const postTicketNote= await Note.create({
    text,
    ticket: req.params.id,
    user: req.user.id
  })
  res.status(200).json(postTicketNote)
})

module.exports= {getNote, postNote}