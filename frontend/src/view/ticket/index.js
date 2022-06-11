import React, {useEffect} from 'react';
import TopMenu from '../../components/top-menu';
import { Link } from 'react-router-dom';
import * as Routes from "../../router";
import {ImBackward} from "react-icons/im";
import {useSelector, useDispatch} from "react-redux"
import {getTickets, clearState} from "../../features/tickets/ticketSlice";
import Loader from '../../components/Loader';
import './ticket.scss';

export default function Ticket() {

  const {tickets, isPending} = useSelector(state => state.ticket)
  const dispatch= useDispatch()

  useEffect(() =>{
    dispatch(getTickets())
    return () =>{
      dispatch(clearState())
    }
  }, [dispatch])

  return (
    <>
      <div className="page-view">
        <TopMenu />
        <div className="view-ticket">
          <Link to={Routes.HOME}>
            <div className="button-back">
              <span><ImBackward /> Back</span>
            </div>
          </Link>
          <div className="manage-ticket">
            <div className="title">
              <span>Tickets</span>
            </div>
            <table>
              <tbody>
                <tr className="tr-body">
                  <th>Date</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
                {!isPending && tickets && tickets.map((data, index) =>(
                  <tr className='td-body' key={index}>
                    <td>{new Date(data.createdAt).toLocaleString('en-us')}</td>
                    <td>{data.product}</td>
                    <td><div className="news" style={{backgroundColor: data.status==='closed' ? "red" : "green"}}><span>{data.status}</span></div></td>
                    <td><div className="btn-view"><Link to={`${Routes.ARTICLE}${Routes.TICKET}/${data._id}`}><span>View</span></Link></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isPending && (
                  <div>
                    <Loader />
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
}
