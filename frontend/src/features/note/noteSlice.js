import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import noteServices from "./noteService"

let initialState={
  notes:[],
  isPending:false,
  isError:false,
  isSuccess:false,
  message:''
}

export const getNote= createAsyncThunk(
  'note/getNote',
  async(id, thunkApi) =>{
    try{
      const token= thunkApi.getState().auth.users.token
      return await noteServices.getTicketNote(id, token)     

    }catch(err){
      const alertMsg= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkApi.rejectWithValue(alertMsg)
    }
  }
)

export const postNote= createAsyncThunk(
  'note/postNote',
  async(data, thunkApi) =>{
    try{
      const token = thunkApi.getState().auth.users.token
      return await noteServices.postTicketNote(data ,token)

    }catch(err){
      const alertMsg= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkApi.rejectWithValue(alertMsg)
    }
  }
)

export const noteSlice= createSlice({
  name:'note',
  initialState,
  reducers:{
    reset:(state) => initialState
  },
  extraReducers:(builder) =>{
    
    builder.addCase(getNote.pending, (state, action) =>{
      state.isPending=true
    })

    builder.addCase(getNote.fulfilled, (state, action) =>{
      state.notes= action.payload
      state.isPending=false
      state.isSuccess=true
    })

    builder.addCase(getNote.rejected, (state, action) =>{
      state.isError=true
      state.isSuccess=false
      state.message= action.payload
    })

    builder.addCase(postNote.pending, (state, action) =>{
      state.isPending=true
    })

    builder.addCase(postNote.fulfilled, (state, action) =>{
      state.notes.push(action.payload)
      state.isPending=false
      state.isSuccess=true
    })

    builder.addCase(postNote.rejected, (state, action) =>{
      state.isError=true
      state.isSuccess=false
      state.message= action.payload
    })
    
  }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer;