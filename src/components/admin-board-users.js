import React, { Component } from "react";

import UserService from "../services/user.service";
import ListUsers from "./list-users";
import Nav from 'react-bootstrap/Nav'

 class AdminBoardUsers extends Component {
  constructor(props) {
    super(props);
    this.handelSelectNav = this.handelSelectNav.bind(this);

    this.state = {
      content: "",
      item: "free",
      key: 1,
    };
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
    return (
      <div className="container">
        <header className="welcome">
          <h3>Listes des Agents</h3>
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
export default AdminBoardUsers;