import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
 class Profile extends Component {
    
  render() {
   
    const currentUser= this.props.user;
    console.log(currentUser)
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    
    return (
      <div className="container">
        <header className="jumbotron">
        <h3>
            <strong>{currentUser.nom}</strong> Profile
          </h3>
        </header>
       
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Etat:</strong> {currentUser.etat}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role.authority}</li>)}
        </ul>
        
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