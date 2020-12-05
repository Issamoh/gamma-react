import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
class TachesModal extends Component{

constructor(props){
    super(props);
    this.setShow = this.setShow.bind(this);
    this.state ={
        show: this.props.show,
    }
}
setShow(e){
    this.setState({show: e})
}
render(){
return(
    <Modal
    size="lg"
    show={this.state.show}
    onHide={() => this.setShow(false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        Large Modal
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>...</Modal.Body>
  </Modal>
    );}
}
export default TachesModal ;