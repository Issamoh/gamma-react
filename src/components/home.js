import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import UserService from "../services/user.service";
import logo from "../img/logo-gamma.png";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="welcome">
          <h3>{this.state.content}</h3>
        </header>
        <Row className="description">
        <Col>
                <div className="left-description">
                  <p><strong>GAMMA</strong> permet de savoir à tout moment qui est en train de faire quoi?</p>
                  <p>Une affectation équitable des tâches ,un milieu de travail professionel ... </p>
              {false && ( <div> <p>Dévelopée avec passion par </p><a href="https://github.com/issamoh">Issam BenMessaoud</a></div> ) }               </div></Col>
        <Col>
                <div className="right-description">
                <img
                    src={logo} 
                    alt="logo-img"
                    className="Card.img"
                  />
                  </div>
        </Col>
        
        </Row>
      </div>
    );
  }
}