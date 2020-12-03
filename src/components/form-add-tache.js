import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios"
import { Redirect } from 'react-router-dom';
import {Button} from 'react-bootstrap'

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

  const vtitle = (value) => {
    if (value.length < 4 || value.length > 50) {
      return (
        <div className="alert alert-danger" role="alert">
          Le titre doit avoir de 4 à 50 characters.
        </div>
      );
    }
  };



class  AddTache extends Component{


constructor(props){
super(props);
this.handleChangeTitle = this.handleChangeTitle.bind(this);
this.handleChangeDescription = this.handleChangeDescription.bind(this);
this.handleChangeDureeSuffisante = this.handleChangeDureeSuffisante.bind(this);
this.handleRegister = this.handleRegister.bind(this);
this.retourner = this.retourner.bind(this);
this.state = {

    title:"",
    description:"",
    dureeSuffisante: '1',

    successful: false, // if false show form else show success alert
    message: "", // response of the server
    header: "" // json web token to be sent with post request
}
}

handleChangeTitle(e){
    this.setState(
        {
            title: e.target.value,
        }
    )
}
handleChangeDescription(e){
    this.setState(
        {
            description: e.target.value,
        }
    )
}
handleChangeDureeSuffisante(e){
    if(e.target.value>0)
    this.setState(
        {
            dureeSuffisante: e.target.value,
        }
    )

}
retourner(){
    <Redirect to="/addtache" />
    this.setState({
        title:"",
        description:"",
        dureeSuffisante: '1',
    
        successful: false, // if false show form else show success alert
        message: ""

    })}
handleRegister(e){
 e.preventDefault();

 this.setState({
    successful: false,
    message: "",
  }); 

 this.form.validateAll();
 if (this.checkBtn.context._errors.length === 0) {
    
    let headers ={
        'Authorization' : this.state.header
    }
    let data ={
        title:this.state.title,
        description: this.state.description,
        dureeSuffisante: this.state.dureeSuffisante,
    }
   axios.post(API_URL+"addtache",data,{headers: headers})
   .then((res) =>{
        this.setState({
            successful: true,
            message: res.data.response
            
        })
   })
   .catch((error) => {
       this.setState({
           successful: false,
           message: error.response.data.response,}

   )
 });
}
}
componentDidMount()
  {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.jwt) {
      this.setState({header: 'Bearer ' + user.jwt });
    };
  };

render(){

    return(
    <div className="card card-container">
        <h1>AJOUTER UNE TACHE</h1>
        <Form
        onSubmit={this.handleRegister}
        ref={(c) => {
          this.form = c;
        }}
        >
            {!this.state.successful &&
        (
            <div>
            <div className="form-group">
                <label htmlFor="titre">Tâche </label>
                <Input /* input (I) en majiscule utilise le composant importé depuis react-validation sinon input standard de react*/
                type="text"
                className="form-control"
                name = "titre"
                value={this.state.title}
                onChange={this.handleChangeTitle}
                validations={[required,vtitle]}
                />
               </div>
               <div className="form-group">
                <label htmlFor="description">Description</label>
                <Input
                type="text"
                className="form-control"
                name = "description"
                value={this.state.description}
                onChange={this.handleChangeDescription}
                />
               </div>
               <div className="form-group">
                <label htmlFor="duree"> Durée de la tâche </label>
                <input
                type="number"
                className="form-control"
                name = "dureeSuffisante"
                value={this.state.dureeSuffisante}
                onChange={this.handleChangeDureeSuffisante}
                />
               </div>

               <div className="form-group">
                   <button className="btn btn-primary btn-block">Ajouter</button>
               </div>
               </div>)}

               { this.state.message && (
                   <div>
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {this.state.message}
                </div>
                {this.state.successful &&(<Button variant="success" onClick={this.retourner}>Retourner</Button>)}
              </div>
            
            </div>)}
               <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />


        </Form>
    </div>

    )
}
}
export default AddTache ;