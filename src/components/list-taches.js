import React, { Component } from 'react';
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import Spinner from 'react-bootstrap/Spinner'

const API_URL= 'http://localhost:8080/';




class ListTaches extends Component{
    constructor(props){
        super(props)
        this.state = {
            etatTaches: this.props.etatTaches, //new, started,finished, expired, abondonned
            requestedBy : this.props.requestedBy, // user or admin to adjust API based on roles
            idUser: this.props.idUser ,
            taches: [],
            headers: {} ,// to be added while sending requests; 
            isLoading: true ,
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
        if(this.state.etatTaches === "new") {API= API_URL+"newtasks"}
        else{
        API = API_URL+this.state.requestedBy+"/"+this.state.etatTaches+"tasks"+(this.state.idUser ? "/"+this.state.idUser : '');}
        axios.get(API,{headers: headers})
        .then((res) => {
        this.setState({taches: res.data, isLoading: false})})
    };

    render(){
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
              {
                dataField: 'DateFin',
                text: 'Date de fin'
              },
          ];
       if(this.state.isLoading){
           return(
        <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
           )}
        return(
            <div>    
                     <BootstrapTable keyField='id' data={ this.state.taches } columns={ columns }  hover/>
           </div>)
            
}}
export default ListTaches; 

