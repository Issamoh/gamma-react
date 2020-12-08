import React, { Component } from "react";

import UserService from "../services/user.service";
import MyTasks from "./my-tasks";
import ListUsers from "./list-users";

export class UserBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return(
      <MyTasks></MyTasks>
    )
    return (
      <div className="container">
        <header className="welcome">
          <h3>{this.state.content}</h3>
        </header>
        
      </div>
    );
  }
}