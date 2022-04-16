import React, {useState, useEffect} from 'react';
import TopMenu from '../../components/top-menu';
import {Link, useParams, useHistory} from "react-router-dom";
import * as Routes from "../../router";
import {ImBackward} from "react-icons/im";
import {MdOutlineAdd} from "react-icons/md";
import PopUp from '../../components/pop-up';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleTicket, closeTickets, clearState} from '../../features/tickets/ticketSlice';
import {getNote, postNote, reset} from "../../features/note/noteSlice"
import './article.scss';

export default function Article() {

  const [isOpen, setIsOpen]= useState(false)
  const [note, setNote] = useState('')
  const {users}= useSelector(state => state.auth)
  const {ticket} = useSelector(state => state.ticket)
  const {notes} = useSelector(state => state.notes)
  const dispatch= useDispatch()
  const history= useHistory()
  const {id} = useParams()

  useEffect(() => {
    dispatch(getSingleTicket(id))
    dispatch(getNote(id))

    return () =>{
      dispatch(clearState())
      dispatch(reset())
    }
  }, [dispatch, id])

  const onSubmit= (e) =>{
    e.preventDefault()

    setIsOpen(false)
    setNote('')
    dispatch(postNote({note, id}))
  }

  const closeTicket = () =>{
    dispatch(closeTickets(id))
    history.push(Routes.TICKET)
  }

  return (
    <>
      <div className="page-view">
        <TopMenu />
        <div className="view-ticket">
          <Link to={Routes.TICKET}>
            <div className="button-back">
              <span><ImBackward /> Back</span>
            </div>
          </Link>
          <div className="detail-ticket">
            <div>
                  <h3>Ticket ID: {ticket._id}</h3>
                  <span>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-us')}</span>
                  <h4>Product: {ticket.product}</h4>
                  <div className="news" style={{
                    backgroundColor: ticket.status==='closed' ? "red" : "green"
                  }}><span>{ticket.status}</span></div>
                  <div className="underline"></div>
                  <div className="box-descrip">
                    <span>Description of issue</span>
                    <p>{ticket.description}</p>
                  </div>
            </div>
            <div className="note">
              <span>Notes</span>
              <div className="btn-note" onClick={() => {setIsOpen(true)}}>
                <span><MdOutlineAdd /> Add Note</span>
              </div>
              {notes.map((val, ind) =>(
                <div className="box-notes" key={ind}>
                  <div className="list-box">
                    <span>Note from {users.name}</span>
                    <p>{val.text}</p>
                    <div className="timestamp">
                      <span>{new Date(val.createdAt).toLocaleString('en-us')}</span>
                    </div>
                  </div>
              </div>
              ))}
            </div>
            {isOpen && <PopUp textNote={note} submit={onSubmit} noteFunc={(e) => {setNote(e.target.value)}} funOff={() => {setIsOpen(false)}} />}
            {ticket.status !== 'closed' && (
              <div className="btn-close-ticket" onClick={closeTicket}>
                <span>Close Ticket</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
