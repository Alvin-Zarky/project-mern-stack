import axios from "axios";

const API_URL= '/api/tickets/';

const createTicketService= async (data, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.post(API_URL, data, config)

  if(!res.data){
    res.status(400)
    throw new Error('No Data Ticket Create')
  }
  return res.data
}

const getAllTickets = async (token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.get(API_URL, config)
  if(!res.data){
    res.status(400)
    throw new Error('No Data Tickets')
  }

  return res.data
}

const getTicket= async (id, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  
  const res= await axios.get(API_URL + id, config)
  if(!res.data){
    res.status(401)
    throw new Error('No Ticket Data')
  }
  return res.data
}

const closeTicket= async (id, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  
  const res= await axios.put(API_URL+id, {status:'closed'}, config)
  return res.data
}

const ticketService={
  createTicketService,
  getAllTickets,
  getTicket,
  closeTicket
}
export default ticketService