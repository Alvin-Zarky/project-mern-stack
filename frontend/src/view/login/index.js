import React, {useState, useEffect} from 'react';
import TopMenu from "../../components/top-menu";
import {FiLogIn} from "react-icons/fi";
import {logIn, clear} from "../../features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import * as Routes from "../../router";
import {toast} from "react-toastify";
import './login.scss';

export default function Login() {

  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const {email, password} = formData

  const {users, isPending, isError, isSuccess, message}= useSelector(state => state.auth)
  const dispatch= useDispatch()
  const history= useHistory()
  const onChange = (e) =>{
    setFormData(prev =>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit= (e) =>{
    e.preventDefault()
    const dataUser={
      email,
      password
    }
    dispatch(logIn(dataUser)).then(() =>{
      dispatch(clear())
    })
    
  }

  useEffect(() =>{
    
    if(isError){
      toast.error(message)
    }
    if(isSuccess || users){
      history.push(Routes.HOME)
      toast.success('Log in successfully!')
    }

  }, [isError, message,isSuccess, history, users])

  return (
    <>
      <div className="page-view">
        <TopMenu />
        <div className="form-login">
          <div className="overview-login">
            <div className="title">
              <span><FiLogIn /> Login</span>
            </div>
            <div className="detail">
              <p>Please log in to get support</p>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="input-email">
              <input type="email" onChange={onChange} id='email' name='email' value={email} placeholder='Enter your email' spellCheck="false" required />
            </div>
            <div className="input-password">
              <input type="password" onChange={onChange} id='password' name='password' value={password} placeholder='Enter your password' required />
            </div>
            {isPending ? <button className="btn-submit">Submiting...</button> : <button className="btn-submit">Submit</button>}
          </form>
        </div>
      </div>
    </>
  );
}
