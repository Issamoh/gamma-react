import React, { Component } from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import { connect } from "react-redux";
  
  import { logout } from "../actions/auth";
class NavigationBar extends Component{
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          showAdminBoard: false,
          currentUser: undefined,
        };
    
      }
    
    componentDidMount() {
        const user = this.props.user;
    
        if (user) {
          this.setState({
            currentUser: user,
            showAdminBoard: user.roles.find(o => o.authority === "ROLE_ADMIN"),
          });
        }
      }
    
      logOut() {
        this.props.dispatch(logout());
      }

    render(){
        const { currentUser, showAdminBoard } = this.state;
        console.log(this.state)

        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">Gamma</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav >
                    <Nav.Link href="/help">Manuel d'utilisation</Nav.Link>
                    {currentUser && (  <Nav.Link href="/taches">Tâches</Nav.Link>)}
                </Nav>
    {showAdminBoard && (<Nav className="mr-auto">
      <NavDropdown title="Gestion des utilisateurs" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/admin/adduser">Ajouter un utilisateur</NavDropdown.Item>
        <NavDropdown.Item href="/admin/allusers">Liste des utilisateurs</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Gestion des Tâches" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/addtache">Ajouter une tâche</NavDropdown.Item>
        <NavDropdown.Item href="/admin/alltasks">Liste des Tâches</NavDropdown.Item>
      </NavDropdown>
    </Nav>)}
    {currentUser ? (
    <Nav className="ml-auto">
      <Nav.Link href="/profile">{currentUser.nom}</Nav.Link>
      <Nav.Link onClick={this.logOut} href="/login">
        Se deconnecter
      </Nav.Link>
    </Nav>)
    :(
        <Nav className="ml-auto">
        <Nav.Link  href="/login">
        Se connecter
      </Nav.Link>
    </Nav> 
    )}
  </Navbar.Collapse>
</Navbar>
        );
        }

    
}
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user,
    };
  }
  
export default connect(mapStateToProps)(NavigationBar);