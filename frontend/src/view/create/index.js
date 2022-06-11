import React, {useState, useEffect} from 'react';
import TopMenu from '../../components/top-menu';
import { Link, useHistory } from 'react-router-dom';
import * as Routes from "../../router";
import {ImBackward} from "react-icons/im";
import {useSelector, useDispatch} from "react-redux";
import { createTicket, clearState } from '../../features/tickets/ticketSlice';
import './create.scss';
import {toast} from "react-toastify";

export default function Create() {

  const {users}= useSelector(state => state.auth)
  const {isSuccess, message, isError, isPending}= useSelector(state => state.ticket);
 
  const [formData, setFormData] = useState({
    name:users.name,
    email:users.email,
    product:'Iphone 13',
    description:''
  })
  const {name, email, product, description} = formData
  const dispatch= useDispatch()
  const history= useHistory()

  const onChange= (e) =>{
    setFormData((prevState) =>{
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const onSubmit= (e) =>{
    e.preventDefault()
    dispatch(createTicket({product, description})).then(() => dispatch(clearState()))
  }

  useEffect(() =>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      dispatch(clearState())
      history.push(Routes.TICKET)
    }
    
    return () => {
      dispatch(clearState())
    }
  }, [isSuccess, history, dispatch, isError, message])


  return (
    <>
      <div className="page-view">
        <TopMenu />
        <div className="create-ticket">
          <Link to={Routes.HOME}>
            <div className="button-back">
              <span><ImBackward /> Back</span>
            </div>
          </Link>
          <div className="form-create">
            <div className="overview">
              <div className="title">
                <span>Create New Ticket</span>
              </div>
              <div className="description">
                <p>Please out the form field below</p>
              </div>
            </div>
            <form onSubmit={onSubmit}>
              <div className="input-type">
                <div>
                  <label>Customer Name</label>
                </div>
                <input type="text" id='name' readOnly disabled name='name' value={name} placeholder='Customer Name' required />
              </div>
              <div className="input-type">
                <div>
                <label>Customer Email</label>
                </div>
                <input type="email" id='email' readOnly disabled name='email' value={email} placeholder='Customer Email' required />
              </div>
              <div className="input-type">
                <div>
                  <label>Product</label>
                </div>
                <select required onChange={onChange} name="product" id="product" value={product}>
                  <option value="Iphone 13">Iphone 13</option>
                  <option value="Ipad">Ipad</option>
                  <option value="Macbook pro">Macbook pro</option>
                </select>
              </div>
              <div className="input-type">
                <div>
                <label>Description of the issue</label>
                </div>
                <input type="text" id='description' name='description' value={description} placeholder='Description' onChange={onChange} required />
              </div>
              {isPending ? <button className="btn-submit">Submiting...</button> : <button className="btn-submit">Submit</button>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
