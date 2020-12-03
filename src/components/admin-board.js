import React, { Component } from "react";

import UserService from "../services/user.service";
import AddTache from "./form-add-tache";
import AddUser from "./form-add-user"

 export class AdminBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
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
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <AddTache></AddTache>
        <AddUser></AddUser>
      </div>
    );
  }
}
