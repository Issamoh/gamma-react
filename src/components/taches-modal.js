import React, { Component } from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
//import {Table, Button, ButtonToolbar,ButtonGroup} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';

import { Redirect } from 'react-router-dom';
const API_URL= 'http://localhost:8080/';

const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'title',
    text: 'Tâche'
  }, {
    dataField: 'description',
    text: 'Description'},
    {
        dataField: 'DateCreation',
        text: 'Date de création'
      },
      {
        dataField: 'dureeSuffisante',
        text: 'Durée estimée'
      },
  ];

  
  
  

class TachesModal extends Component{

constructor(props){
    super(props);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handelHideModal =this.handelHideModal.bind(this);
    this.handelNoTasks = this.handelNoTasks.bind(this);
    this.state ={
        show: this.props.show,
        headers: {},
        tasks: [],
        isLoading: true,
        idTaskSelected: '',
        idUserSelected : this.props.idUserSelected,
        requestSent: false , // requete envoyée ou pas n-importe le response
        successful: false, // si l'attribution de tache est faite notifier list-users pour retirer l'agent
        selected: [], // l'id du rang selectionne dans la table serve aussi pour afficher le bouton de confirmation dans le footer du modal
        message : '',
        wanteAddTask: false,
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
    
    axios.get(API_URL+"newtasks",{headers: headers})
    .then((res) => {
    this.setState({tasks: res.data, isLoading: false})})
};


handleOnSelect = (row, isSelect) => {
    console.log(row,isSelect);
    if (isSelect) {
        this.setState(() => ({
            selected: [row.id],
            idTaskSelected: row.id,
        }));
      } else {
        this.setState(() => ({
          selected: [],
          idTaskSelected: ''
        }));
      }
}

handleConfirm(){
    let data= {
        idUser: this.props.idUserSelected,
        idTache: this.state.idTaskSelected,
    };
    console.log(data);
    this.setState({requestSent: true});
    axios.post(API_URL+"assigntasktouser",data, {headers: this.state.headers})
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
handelHideModal(){
    this.props.onHide(this.state.successful);
        this.setState({
            show: false
        })
}
handelNoTasks(){
  this.setState({wanteAddTask: true})
  
}

render(){


    const selectRow = {
        mode: 'radio', // single row selection
        clickToSelect: true,
        bgColor: '#dee2e6',
        selected: this.state.selected,
        onSelect: this.handleOnSelect,
      };
      
      if(this.state.wanteAddTask) return (<Redirect to="/addtache" />)

return(
    
    <Modal
    size="lg"
    show={this.state.show}
    onHide={this.handelHideModal}
    dialogClassName="modal-100w"
    aria-labelledby="example-custom-modal-styling-title"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        Liste des nouvelles tâches
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
          {!this.state.tasks.length >0 ? (<div className="form-group text-center">
                <div >
                  <p>Pas de nouvelles tâches</p>
                </div>
                <Button variant="success" onClick={this.handelNoTasks}>Ajouter une tâche</Button>
           </div> ):(    
  <BootstrapTable keyField='id' data={ this.state.tasks } columns={ columns } selectRow={selectRow}  hover/>
           )}
    </Modal.Body>
    <Modal.Footer>
        { !this.state.requestSent ? (
        this.state.selected.length>0 && (
            <Button variant="success" onClick={this.handleConfirm}>Confirmer</Button>))
        : (
            <div className={  this.state.successful ? "alert alert-success  align-self-cente" : "alert alert-danger" } role="alert">
                  {this.state.message}
                </div>
        )
        
        }
        </Modal.Footer>
  
  </Modal>
    );}
}

export default TachesModal ;