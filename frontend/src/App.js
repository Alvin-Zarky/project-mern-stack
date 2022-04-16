import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import * as Routes from "./router";
import HomePage from './view/home';
import Login from "./view/login";
import Register from './view/register';
import Create from "./view/create";
import Ticket from "./view/ticket";
import Article from "./view/article-ticket";
import NotFound from "./view/not-found";
import {ToastContainer} from "react-toastify";
import { useSelector } from 'react-redux';
import '../node_modules/react-toastify/dist/ReactToastify.css';

function App() {

  const {users}= useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path={`${Routes.HOME}`}>
            <HomePage />
          </Route>
          <Route path={`${Routes.LOGIN}`}>
            <Login />
          </Route>
          <Route path={`${Routes.REGISTER}`}>
            <Register />
          </Route>
          <Route path={Routes.CREATED}>
            {users && <Create />}
            {!users && <Redirect to={Routes.LOGIN} />}
          </Route>
          <Route path={Routes.TICKET}>
            {users && <Ticket />}
            {!users && <Redirect to={Routes.LOGIN} />}
          </Route>
          <Route path={`${Routes.ARTICLE}${Routes.TICKET}/:id`}>
            {users && <Article />}
            {!users && <Redirect to={Routes.HOME} />}
          </Route>
          <Route path={Routes.NOT_FOUND}>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
