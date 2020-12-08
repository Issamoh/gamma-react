import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import ListTaches from "./list-taches";
import {Table, Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
 class Profile extends Component {
    
  constructor(props) {
    super(props);
    this.handelSelectNav = this.handelSelectNav.bind(this);

    this.state = {
      content: "",
      item: "finished",
      key: 1,
    };
  }


  handelSelectNav(navItem){
    this.setState(
      {
        item: navItem,
        key: this.state.key + 1 % 2 // this state is used as a key to list-users so when selecting a nav item the key of list-users changes then react will re render the component with new state (free or busy)
      }
    );
  }
  render() {
    
   
    const currentUser= this.props.user;
    console.log(currentUser)
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    
    return (
      <div className="container">
        <header className="welcome">
          <h3>Bienvenue {currentUser.nom}</h3>
        </header>
        <div className="text-center">
          <h3>Mes informations</h3>
          </div>
        <Table striped bordered hover>
          <thead>
          <th>Nom d'utilisateur</th>
          <th>Nom complet</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Etat</th>
          <th>Privilèges</th>
          </thead>
          <tbody>
            <tr>
          <td>{currentUser.username}</td>
          <td>{currentUser.nom}</td>
          <td>{currentUser.email}</td>
          <td>{currentUser.tel}</td>
          <td>{currentUser.etat}</td>
          <td>{currentUser.roles.map((role, index) => <p key={index}>{role.authority}</p>)}</td></tr>
          </tbody>
        </Table>
        <div className="text-center">
          <h3>Historique</h3>
          </div>
              <Nav justify variant="tabs" defaultActiveKey="finished" onSelect={this.handelSelectNav}>
               
                <Nav.Item>
                  <Nav.Link eventKey="finished">Mes tâches terminées</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="started">Mes tâches en cours</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="abondonned" disabled>Mes tâches abondonées</Nav.Link>
                </Nav.Item>
              </Nav>

    <ListTaches key={this.state.key} etatTaches={this.state.item} requestedBy={"user"} idUser={currentUser.id}> </ListTaches>
        
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(Profile);