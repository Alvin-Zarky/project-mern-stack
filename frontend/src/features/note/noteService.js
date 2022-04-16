import axios from "axios"

const API_URL= '/api/tickets/'

const getTicketNote = async(id, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.get(API_URL + id + '/note', config)
  return res.data
}

const postTicketNote = async(data, token) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  const res= await axios.post(API_URL + data.id + '/note', {text:data.note}, config)
  return res.data
}

const noteServices={
  getTicketNote,
  postTicketNote
}

export default noteServices