import React, { Component } from "react";

import UserService from "../services/user.service";
import AddTache from "./form-add-tache";
import AddUser from "./form-add-user"
import ListUsers from "./list-users";
import Nav from 'react-bootstrap/Nav'

 export class AdminBoard extends Component {
  constructor(props) {
    super(props);
    this.handelSelectNav = this.handelSelectNav.bind(this);

    this.state = {
      content: "",
      item: "free",
      key: 1,
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

  handelSelectNav(navItem){
    this.setState(
      {
        item: navItem,
        key: this.state.key + 1 % 2 // this state is used as a key to list-users so when selecting a nav item the key of list-users changes then react will re render the component with new state (free or busy)
      }
    )

  }
  render() {
    console.log(this.state.item)
    return (
      <div className="container">
        <header className="welcome">
          <h3>{this.state.content}</h3>
        </header>

              <Nav justify variant="tabs" defaultActiveKey="free" onSelect={this.handelSelectNav}>
                <Nav.Item>
                  <Nav.Link eventKey="free">Agents libres</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="busy">Agents occupés</Nav.Link>
                </Nav.Item>
              </Nav>

              <ListUsers key={this.state.key} etatUsers={this.state.item}></ListUsers>
       
        
      </div>
    );
  }
}
