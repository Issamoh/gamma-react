import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import axios from "axios"
import { Redirect } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


const API_URL= 'http://localhost:8080/';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champs est obligatoire!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Cette adresse email n'est pas valide.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit avoir de 3 à 20 characters.
      </div>
    );
  }
};
const vname = (value) => {
  if (value.length < 4 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom doit avoir de 4 à 40 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit avoir de 6 à 40 characters.
      </div>
    );
  }
};

const vtel = (value) => {
  if (value.length !== 10) {
    return (
      <div className="alert alert-danger" role="alert">
        Le numéro de téléphone doit avoir 10 characters.
      </div>
    );
  }
};

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    this.onChangePoste = this.onChangePoste.bind(this);
    this.retourner = this.retourner.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    
    this.state = {
      username: "",
      email: "",
      name: "",
      tel:"",
      password: "",
      poste: "" ,
      role: "user",
      roleShown: "Agent",
      successful: false,
      message:"",
      header:"",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeTel(e) {
    this.setState({
      tel: e.target.value,
    });
  }

  onChangePoste(e) {
    this.setState({
      poste: e.target.value,
    });
  }
  retourner(){
    <Redirect to="/admin/adduser" />
    this.setState({
      username: "",
      email: "",
      name: "",
      tel:"",
      password: "",
      poste: "" ,
      successful: false,
      message:"",
      role:"user",
      roleShown: "Agent"
    });
  }
  handleSelect(e)
  {
    e === 'Agent' ? (
  this.setState({role: "user", roleShown: "Agent"}))
  : this.setState({role: "admin",  roleShown: "Administrateur"})
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
      message: "",
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        let headers= {
            /*'Content-Type': 'application/json',*/
            'Authorization': this.state.header,
        }
        let data= {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            nom: this.state.name,
            poste: this.state.poste,
            tel:  this.state.tel,
            role: this.state.role , // admin or user
        };
      //  console.log(data);
        axios.post(API_URL+"admin/adduser",data, {headers: headers})
        .then((res) => {
            console.log(res.data.response);
          this.setState({
            successful: true,
            message: res.data.response,
          });
        })
        .catch((error) => {
            console.log(error.response);
          this.setState({
            successful: false,
            message: error.response.data.response,

          });
        });
    }
  }
  componentDidMount()
  {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.jwt) {
      this.setState({header: 'Bearer ' + user.jwt });
    }
  }

  render() {
    

    return (
      
      <div className="container">
        <div className="cardForm card-container">
          <h1>AJOUTER UN UTILISATEUR</h1>
          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Nom d'utilisateur</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Nom complet d'utilisateur</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[email]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tel">Télephone</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="tel"
                    value={this.state.tel}
                    onChange={this.onChangeTel}
                    validations={[required, vtel]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tel">Poste</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="poste"
                    value={this.state.poste}
                    onChange={this.onChangePoste}
                  />
                </div>       
                <div className="form-group">
                <label htmlFor="role">Privilège de l'utilisateur</label>
                 <DropdownButton
                  alignRight
                  title={this.state.roleShown}
                  id="dropdown-menu-align-right"
                  drop='right'
                  variant="secondary"
                  >
                    <Dropdown.Item eventKey="Agent" onSelect={this.handleSelect}>Agent</Dropdown.Item>
                    <Dropdown.Item eventKey="Admin" onSelect={this.handleSelect}>Administrateur</Dropdown.Item>
                </DropdownButton>        
                </div> 

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Ajouter</button>
                </div>
              </div>
            )}

            {this.state.message && (
               <div className="form-group text-center">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {this.state.message}
                </div>
                {this.state.successful &&(<Button variant="success" onClick={this.retourner}>Retourner</Button>)}
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default AddUser;