import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

let user = JSON.parse(localStorage.getItem('users'))

let initialState= {
  users: user? user: null,
  isPending:false,
  isError:false,
  isSuccess:false,
  message:null
}

export const register= createAsyncThunk(
  'auth/register',
  async(user, thunkApi) =>{
    try{
      return await authService.register(user)
    }catch(err){
      const alertMsg= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      
      return thunkApi.rejectWithValue(alertMsg)
    }
  }
)

export const logIn= createAsyncThunk(
  'auth/login',
  async(user, thunkApi) =>{
    try{
      return await authService.logIn(user)
    }catch(err){
      const alertMsg= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      
      return thunkApi.rejectWithValue(alertMsg)
    }
  }
)

export const logout= createAsyncThunk(
  'auth/logout',
  async(user, thunkApi) =>{
    return authService.logout()
  }
)

export const authSlicer= createSlice({
  name:'auth',
  initialState,
  reducers:{
    clear: (state, action) =>{
      state.isPending= false
      state.isError= false
      state.isSuccess=false
      state.message= null
    }
  },
  extraReducers: (builder) =>{

    // for register
    builder.addCase(register.pending, (state, action) =>{
      state.isPending=true
      state.isError= false
      state.isSuccess=false
    })
    builder.addCase(register.fulfilled, (state, action) =>{
      state.isPending= false
      state.users= action.payload
      state.isSuccess=true
    })
    builder.addCase(register.rejected, (state, action) =>{
      state.isError= true
      state.isSuccess= false
      state.message= action.payload
    })
    
    // for log in
    builder.addCase(logIn.pending, (state, action) =>{
      state.isPending=true
      state.isError=false
      state.isSuccess=false
    })
    builder.addCase(logIn.fulfilled, (state, action) =>{
      state.isPending=false
      state.users=action.payload
      state.isError=false
      state.isSuccess=true
    })
    builder.addCase(logIn.rejected, (state, action) =>{
      state.isPending=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    // for logout
    builder.addCase(logout.fulfilled, (state, action) =>{
      state.users= null
    })
  }
})
export const {clear} = authSlicer.actions;
export default authSlicer.reducer;