import React, { Component } from 'react';
import axios from "axios";
import {Table, Button} from 'react-bootstrap'
import TachesModal from './taches-modal'
import Spinner from 'react-bootstrap/Spinner'

const API_URL= 'http://localhost:8080/';




class ListUsers extends Component{
    constructor(props){
        super(props)
        this.handelShowModal = this.handelShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.state = {
            etatUsers: this.props.etatUsers,
            showAssign: false,
            users: [],
            headers: {} ,// to be added while sending requests; 
            isLoading: true ,
            showModal: false,
            keyModal: 0, // changed to change key of modal so react re render the modal with show state as true 
            idUserSelected: -1
        }
    }

    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('user'));
        let header; 
    if (user && user.jwt) {
      header = 'Bearer ' + user.jwt
    };
    let headers = {
        'Authorization' : header
    }
    this.setState({headers: headers });
        let API ;
        if(this.state.etatUsers === "free") {API = API_URL+"admin/freeusers"; this.setState({showAssign: true})}
        else {API = API_URL+"admin/busyusers"}
        axios.get(API,{headers: headers})
        .then((res) => {
        this.setState({users: res.data, isLoading: false})})
    };

    handelShowModal(e)
{
    this.setState({showModal: true,  keyModal: this.state.keyModal + 1 % 2, idUserSelected:e.target.value}) ;
}
handleCloseModal(done){ // passed as props to the modal so we can know if affectiong user is succeded == done true ?
    if(done){
        //delete user from free list
        let newusers = [...this.state.users].filter(user => user.id !== parseInt(this.state.idUserSelected));
        console.log(newusers);
        this.setState({
            users: newusers
        })
    }
}
    render(){
       if(this.state.isLoading){
           return(
        <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
           )}
        return(
            <div>    
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Nom d'utilisateur</th>
                                <th>Nom complet</th>
                                <th>Poste</th>
                                <th>Email</th>
                                <th>Téléphone</th>
                                {this.state.showAssign && (<th>Tâche</th>)}
                                </tr>
                            </thead>
                        { !this.state.isLoading &&(  
                        <tbody>{
                            this.state.users.map(user => 
                                <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.nom}</td>
                                <td>{user.poste}</td>
                                <td>{user.email}</td>
                                <td>{user.tel}</td>
                                {this.state.showAssign && (<td><Button value={user.id} variant="success" onClick={this.handelShowModal}>Affecter-le</Button></td>)}
                                </tr>
                            )
                            }</tbody>
                            )}
                    </Table>
                    <TachesModal key={this.state.keyModal} show={this.state.showModal} idUserSelected={this.state.idUserSelected} onHide={this.handleCloseModal} ></TachesModal>
        
           </div>)
            
}}
export default ListUsers; 

