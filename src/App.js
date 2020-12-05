import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from 'react';

import React from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

  import Login from "./components/login";
  import NavigationBar from "./components/navBar"
  import {Home} from "./components/home";
  import Profile from "./components/profile";
  import {UserBoard} from "./components/user-board";
  import {AdminBoard} from "./components/admin-board";
  import AddUser from "./components/form-add-user";
  import AddTache from "./components/form-add-tache";
  import { logout } from "./actions/auth";
  import { clearMessage } from "./actions/message";


  
  import { history } from './helpers/history';
  
  class App extends Component {
  
  
    render() {
     
      return (
        <Router history={history}>
          <div>
            <NavigationBar></NavigationBar>
            <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/user" component={UserBoard} />
                <Route exact path="/admin/allusers" component={AdminBoard} />
                <Route exact path= "/admin/adduser" component={AddUser} />
                <Route exact path= "/addtache" component={AddTache} />
               
              </Switch>
            </div>
          </div>
        </Router>
      );
    }
  }
  
  function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user,
    };
  }
  
  export default connect(mapStateToProps)(App);
