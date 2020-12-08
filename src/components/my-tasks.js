import React, { Component } from 'react';
import {Card, Spinner, Button} from 'react-bootstrap';
import TachesModal from './taches-modal'
import axios from "axios"
const API_URL= 'http://localhost:8080/';

class MyTasks extends Component{
    constructor(props){
        super(props);
        this.handelFinish= this.handelFinish.bind(this);
        this.handelShowModal = this.handelShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.state ={
            headers: {},
            tasks: [],
            user: {} ,
            isLoading: true,
            successful: false, // si l'attribution de tache est faite notifier list-users pour retirer l'agent
            message : '',
            showModal: false, 
            keyModal: 0, // changed to change key of modal so react re render the modal with show state as true 
        }
    }
    
    
    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({user: user});
        let header; 
    if (user && user.jwt) {
      header = 'Bearer ' + user.jwt
    };
    let headers = {
        'Authorization' : header
    }
    this.setState({headers: headers });
        axios.get(API_URL+"user/startedtasks/"+user.id,{headers: headers})
        .then((res) => {
        this.setState({tasks: res.data, isLoading: false})})
    };

    handelFinish(){
        this.setState({isLoading: true})
        let data = {
            idUser: this.state.user.id,
            idTache: this.state.tasks[0].id ,
        }

        axios.post(API_URL+"finishtask",data,{headers: this.state.headers})
        .then((res) => {
        this.setState({user: {...this.state.user, etat:"OCCUPEE" }, isLoading: false, tasks: [], showModal:false, keyModal: this.state.keyModal + 1 % 2})})
    }
    handelShowModal()
    {
        this.setState({showModal: true,  keyModal: this.state.keyModal + 1 % 2, idUserSelected:this.state.user.id}) ;
    }
    handleCloseModal(done){ // passed as props to the modal so we can know if affectiong user is succeded == done true ?
        if(done){
            //re fetch started tasks of the user
           
            this.setState({
                isLoading: true
            })
            axios.get(API_URL+"user/startedtasks/"+this.state.user.id,{headers: this.state.headers})
            .then((res) => {
            this.setState({tasks: res.data, isLoading: false})})

        }
    }
    render(){
        if(this.state.isLoading){
            return(
         <Spinner animation="border" role="status">
         <span className="sr-only">Loading...</span>
       </Spinner>
            )}
        // get will return an array but with just one element beacause a user is not allowed to have 2 tasks at once
        const task = this.state.tasks[0];
        return(
        <div className="container">
            {!task ? 
            (<div className="centered-div" >
             <div className="form-group text-center">
                <div >
                  <h2>Vous êtes libre, choisissez une tâche</h2>
                </div>
                <Button variant="success" onClick={this.handelShowModal}>Choisir maintenant</Button>
                <TachesModal key={this.state.keyModal} show={this.state.showModal} idUserSelected={this.state.idUserSelected} onHide={this.handleCloseModal} ></TachesModal>
              </div>
            </div>) : (
               <div className="centered-div">
               <Card className="m-5 border-0 shadow" border="success" >
               <Card.Header>
                <Card.Title style={{textAlign:"center"}}> {task.title}</Card.Title>
               <Card.Subtitle style={{textAlign:"left"}}>{task.description} </Card.Subtitle>
               </Card.Header>
               <Card.Body>
               <ul>
               <li>Date de création | {task.dateCreation}</li>
               <li>Date de début | {task.dateDebut}</li>
               <li>Durée estimée | {task.dureeSuffisante}</li>
               </ul>
                </Card.Body>
                <Card.Footer>
                <div className="text-center">
                <Button variant="success" onClick={this.handelFinish}>Terminer maintenant</Button>
                </div>
                </Card.Footer>
               </Card>
              
           </div> 
            )}
        </div>
        )
    }
}

export default MyTasks ;