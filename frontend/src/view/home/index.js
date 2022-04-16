import React from 'react';
import {Container, Row, Col} from "reactstrap";
import { Link } from 'react-router-dom';
import * as Routes from "../../router";
import TopMenu from '../../components/top-menu';
import {AiOutlineQuestionCircle} from "react-icons/ai";
import {FaTicketAlt} from "react-icons/fa";
import './home.scss';

export default function HomePage() {
  return (
    <>
    <div className="page-view">
      <TopMenu />
      <Container>
        <Row>
          <Col xl="12" lg="12">
            <div className="overview">
              <div className="title">
                <span>What do you need help with?</span>
              </div>
              <div className="description">
                <p>Please choose from an option below</p>
              </div>
              <div className="button-click">
                <Link to={Routes.CREATED}>
                  <div className="create-new">
                    <span><AiOutlineQuestionCircle /> Create New Ticket</span>
                  </div>
                </Link>
                <Link to={Routes.TICKET}>
                  <div className="view-ticket">
                    <span><FaTicketAlt /> View My Tickets</span>
                  </div>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}
