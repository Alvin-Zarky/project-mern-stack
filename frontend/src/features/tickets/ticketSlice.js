import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ticketService from "./ticketServices";

let initialState={
  tickets:[],
  ticket:{},
  isError:false,
  isSuccess:false,
  isPending:false,
  isClose:false,
  message: ''
}

export const createTicket= createAsyncThunk(
  'ticket/create',
  async(dataTicket, thunkApi) =>{
  try{
    const token= thunkApi.getState().auth.users.token;
    return await ticketService.createTicketService(dataTicket, token)
  }catch(err){
    const alertMsg= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      
    return thunkApi.rejectWithValue(alertMsg)
  }
})

export const getTickets= createAsyncThunk(
  'ticket/getTicket',
  async(data, thunkApi) =>{
    try{
      const token= thunkApi.getState().auth.users.token
      return await ticketService.getAllTickets(token)
    }catch(err){
      
      const alertMsg= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkApi.rejectWithValue(alertMsg)
    }
  }
)

export const getSingleTicket= createAsyncThunk(
  'ticket/getSingleTicket',
  async(ticketId, thunkApi) =>{
  try{
    const token = thunkApi.getState().auth.users.token
    return await ticketService.getTicket(ticketId, token)
  }catch(err){
    const alertMsg= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkApi.rejectWithValue(alertMsg)
  }
})

export const closeTickets= createAsyncThunk(
  'ticket/closeTicket',
  async(id, thunkApi) =>{
    try{
      const token = thunkApi.getState().auth.users.token
      return await ticketService.closeTicket(id, token)
    }catch(err){
      const alertMsg= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkApi.rejectWithValue(alertMsg)
    }
  }
)

const ticketSlice= createSlice({
  name:'ticket',
  initialState,
  reducers:{
    // reset: (state) => {
    //   state.isPending=false
    //   state.isError=false
    //   state.isSuccess=false
    //   state.isClose=false
    //   state.message=''
    // },
    clearState: (state) => initialState
  },
  extraReducers:(builder) =>{

    // for creating ticket
    builder.addCase(createTicket.pending, (state, action) =>{
      state.isPending=true
    })

    builder.addCase(createTicket.fulfilled, (state, action) =>{
      state.isSuccess=true
    })

    builder.addCase(createTicket.rejected, (state, action) =>{
      state.isError=true
      state.message= action.payload
    })

    // for getting tickets
    builder.addCase(getTickets.pending, (state, action) =>{
      state.isPending=true
    })

    builder.addCase(getTickets.fulfilled, (state, action) =>{
      state.tickets= action.payload
      state.isPending=false
      state.isSuccess=true
    })

    builder.addCase(getTickets.rejected, (state, action) =>{
      state.isError=true
      state.message= action.payload
      state.isPending=false
    })

    // get single ticket
    builder.addCase(getSingleTicket.pending, (state, action) =>{
      state.isPending=true
    })

    builder.addCase(getSingleTicket.fulfilled, (state, action) =>{
      state.ticket= action.payload
      state.isPending=false
      state.isSuccess=true
    })

    builder.addCase(getSingleTicket.rejected, (state, action) =>{
      state.isError=true
      state.message= action.payload
      state.isPending=false
    })

    // close ticket
    builder.addCase(closeTickets.pending, (state, action) =>{
      state.isPending=true
      state.isClose=false
    })

    builder.addCase(closeTickets.fulfilled, (state, action) =>{
      state.isPending=false
      state.isClose= true
      state.tickets.map((val) => 
        val._id === action.payload._id ? val.status='closed' : val
      )
      state.isSuccess=true
    })

    builder.addCase(closeTickets.rejected, (state, action) =>{
      state.isPending=false
      state.isError=true
      state.message= action.payload
      state.isClose=false
    })
  }
})

export const {reset, clearState} = ticketSlice.actions
export default ticketSlice.reducer