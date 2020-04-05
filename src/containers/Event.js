import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, label } from "react-bootstrap";
import { getAuthToken, getUserName, getUserRole } from "../Session";
import "./Event.css";
import axios from 'axios';
import { setAuthToken, setUserName } from "../Session";

export default class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: getUserName(),
      authtoken: getAuthToken(),
      userRole: getUserRole(),
      isAdmin: false,
      eventName: '',
      description: '',
      fromDate: '',
      toDate: '',
      pointOfContact: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      pinCode: '',

      events: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return (this.state.eventName.length > 0 && this.state.description.length > 0 &&
    this.state.fromDate.length > 0 && this.state.toDate.length > 0 &&
    this.state.pointOfContact.length > 0 && this.state.address1.length > 0 &&
     this.state.address2.length > 0 && this.state.city.length > 0 &&
     this.state.state.length > 0 && this.state.pinCode.length > 0
      );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {

    event.preventDefault();
    const body = {
      eventName: this.state.eventName,
      description: this.state.description,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pointOfContact: this.state.pointOfContact,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      pinCode: this.state.pinCode,
    };
    const body1 = {
      eventName: this.state.eventName,
      description: this.state.description,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      pointOfContact: this.state.pointOfContact,
      "eventLocation" : {
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      pinCode: this.state.pinCode
      }
    };
    console.log(body);
    axios({
      method: 'post',
      url: 'http://eventcreation-s2-travelsystem.apps.na311.openshift.opentlc.com/event/v1/create',
      data: body1,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.authtoken
      }
    }).then(response => response.data)
      .then((data) => {
         console.log(data);
        this.props.history.push("/home");
      });
  }



  render() {

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="eventName" bsSize="large">
            <label>Event name</label>
            <FormControl
              autoFocus
              type="eventName"
              value={this.state.eventName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="description" bsSize="large">
            <label>Event description</label>
            <FormControl
              autoFocus
              type="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="fromDate" bsSize="large">
            <ControlLabel>From Date</ControlLabel>
            <FormControl
              autoFocus
              type="Date"
              value={this.state.fromDate}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="toDate" bsSize="large">
            <ControlLabel>To Date</ControlLabel>
            <FormControl
              autoFocus
              type="Date"
              value={this.state.toDate}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="pointOfContact" bsSize="large">
            <ControlLabel>Point of Contact</ControlLabel>
            <FormControl
              autoFocus
              type="pointOfContact"
              value={this.state.pointOfContact}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="address1" bsSize="large">
            <ControlLabel>Address1</ControlLabel>
            <FormControl
              autoFocus
              type="address1"
              value={this.state.address1}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="address2" bsSize="large">
            <ControlLabel>Address2</ControlLabel>
            <FormControl
              autoFocus
              type="address2"
              value={this.state.address2}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="city" bsSize="large">
            <ControlLabel>City</ControlLabel>
            <FormControl
              autoFocus
              type="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="state" bsSize="large">
            <ControlLabel>State</ControlLabel>
            <FormControl
              autoFocus
              type="state"
              value={this.state.state}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="pinCode" bsSize="large">
            <ControlLabel>PinCode</ControlLabel>
            <FormControl
              autoFocus
              type="number"
              value={this.state.pinCode}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            cellPadding="center"
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
