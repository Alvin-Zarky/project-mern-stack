import React, {useState, useEffect} from 'react';
import TopMenu from "../../components/top-menu";
import {BiUser} from "react-icons/bi";
import { toast } from 'react-toastify';
import {useSelector, useDispatch} from "react-redux";
import { register, clear} from '../../features/auth/authSlice';
import { useHistory } from 'react-router-dom';
import * as Routes from "../../router";
import './register.scss';

export default function Register() {

  const [formValue, setFormValue] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const {name, email, password, confirmPassword} = formValue
  
  const {users, isPending, isError, isSuccess, message} = useSelector(state => state.auth)
  
  const dispatch= useDispatch()
  const history= useHistory()

  const onChange= (e) =>{
    setFormValue(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const submitFunc = (e) =>{
    e.preventDefault()
    
    if(confirmPassword !== password){
      toast.error('Password does not match!')
      return
    }
    let dataUser={
      name,
      email,
      password,
      confirmPassword
    }
    dispatch(register(dataUser)).then(() =>{
      dispatch(clear())
    })
  }

  useEffect(() =>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess || users){
      history.push(Routes.HOME)
      toast.success('Register Successfully!')
    }

  }, [isError, message, isSuccess, history, users])
  
  return (
    <>
      <div className="page-view">
        <TopMenu />
        <div className="form-login">
          <div className="overview-login">
            <div className="title">
              <span><BiUser /> Register</span>
            </div>
            <div className="detail">
              <p>Please create an account</p>
            </div>
          </div>
          <form onSubmit={submitFunc}>
            <div className="input-email">
              <input type="text" onChange={onChange} value={name} id='name' name='name' placeholder='Enter your name' spellCheck="false" required />
            </div>
            <div className="input-name">
              <input type="email" onChange={onChange} value={email} id='email' name='email' placeholder='Enter your email' spellCheck="false" required />
            </div>
            <div className="input-password">
              <input type="password" onChange={onChange} value={password} id='password' name='password' placeholder='Enter your password' required />
            </div>
            <div className="input-password">
              <input type="password" onChange={onChange} value={confirmPassword} id='confirmPassword' name='confirmPassword' placeholder='Confirm your password' required />
            </div>
            {isPending && <button className="btn-submit">Submiting...</button>}
            {!isPending && <button className="btn-submit">Submit</button>}
          </form>
        </div>
      </div>
    </>
  );
}
