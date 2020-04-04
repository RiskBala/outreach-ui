import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import cookies from 'react-cookies'
import "./Login.css";
import axios from 'axios';
import {setAuthToken, setUserName, setUserRole} from "../Session";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      grant_type:"password",
      userResponse: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://zuulserver-s2-travelsystem.apps.na311.openshift.opentlc.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic '+btoa("client:secret")
      },
      params: {
        username: this.state.username,
        password: this.state.password,
        grant_type:this.state.grant_type
      }
    }).then(response => response.data)
      .then((data) => {
       setAuthToken(data.access_token);
       setUserName(this.state.username);
       setUserRole(data.roles);
       this.props.userHasAuthenticated(true);
       console.log(window.sessionStorage.getItem("username"));
       this.props.history.push("/home");
    
      });
    console.log(this.state.userResponse);
     
  }


  render() {
   
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
