import React, { Component } from "react";

import ListTaches from "./list-taches";
import Nav from 'react-bootstrap/Nav'

 export class AdminBoardTasks extends Component {
  constructor(props) {
    super(props);
    this.handelSelectNav = this.handelSelectNav.bind(this);

    this.state = {
      content: "",
      item: "new",
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
          <h3>Tâches</h3>
        </header>

              <Nav justify variant="tabs" defaultActiveKey="new" onSelect={this.handelSelectNav}>
                <Nav.Item>
                  <Nav.Link eventKey="new">Nouvelles tâches</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="started">Tâches en cours</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="finished">Tâches terminées</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="expired" disabled>Tâches expirées</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="abondonned" disabled>Tâches abondonées</Nav.Link>
                </Nav.Item>
              </Nav>

    <ListTaches key={this.state.key} etatTaches={this.state.item}  requestedBy={"admin"}></ListTaches>
       
        
      </div>
    );
  }
}
