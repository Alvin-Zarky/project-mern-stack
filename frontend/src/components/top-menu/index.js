import React from 'react';
import {Container, Row, Col} from "reactstrap";
import {NavLink, Link} from "react-router-dom";
import {FiLogIn} from "react-icons/fi";
import {BiUser} from "react-icons/bi";
import {BiLogOut} from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import {logout, clear} from "../../features/auth/authSlice";
import { clearState } from '../../features/tickets/ticketSlice';
import * as Routes from "../../router";
import './top-menu.scss';

export default function TopMenu() {

  const {users} = useSelector(state => state.auth)
  const dispatch= useDispatch()

  const onLogout= () =>{
    dispatch(logout()).then(() =>{
      dispatch(clear())
      dispatch(clearState())
    })
  }

  return (
    <>
      <Container fluid>
        <Container className="top-menu-main">
          <Row>
            <Col xl="6" lg="6" md="6">
              <div className="title-logo">
                <span><NavLink exact to={`${Routes.HOME}`}>Support Desk</NavLink></span>
              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <nav className="top-menu">
                <ul>
                  {users && (
                   <li><Link to={`${Routes.HOME}`} style={{paddingRight:0}}><div className="logout" onClick={onLogout}><span><BiLogOut /> Logout</span></div></Link></li>
                  )}
                  {!users && (
                    <>
                      <li><NavLink to={`${Routes.LOGIN}`}><FiLogIn style={{marginRight:"5px"}} />Login</NavLink></li>
                      <li><NavLink style={{paddingRight:0}} to={`${Routes.REGISTER}`}><BiUser /> Register</NavLink></li>
                    </>
                  )}
                </ul>
              </nav>
            </Col>
          </Row>
          <div className="underline"></div>
        </Container>
      </Container>
    </>
  );
}
