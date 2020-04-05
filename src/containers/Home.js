import React, { Component } from "react";
import "./Home.css";
import { getAuthToken, getUserName, getUserRole } from "../Session";
import axios from 'axios';
import EventSummary from './EventSummary';
import { Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: getUserName(),
            authtoken: getAuthToken(),
            userRole: getUserRole(),
            isAdmin: false,
            events: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log('cheintgsdfd');
        axios({
            method: 'get',
            url: 'http://eventdetail-s2-travelsystem.apps.na311.openshift.opentlc.com/events/eventStatus',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.authtoken,
                'userId': this.state.username,
                'roles':this.state.userRole,
            }
        }).then(response => response.data)
            .then((data) => {
                console.log('cehek', data)
                this.setState({ events: data })
                console.log('cehek', data)
            });
            console.log('cheintg edd');
    }

    handleSubmit = event => {
        this.props.history.push("/event");
    }
    
    handleClick = (eventId)=>{
     axios({
      method: 'post',
      url: 'http://zuulserver-s2-travelsystem.apps.na311.openshift.opentlc.com/registration/v1/'+eventId,
      headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.authtoken,
                'userId': this.state.username,
                'roles':this.state.userRole,
            }
    }).then(response => response.data)
      .then((data) => {
        alert(data)
      });
    }

    render() {
        if (this.state.userRole === 'ADMIN') {
            this.state.isAdmin = true;
        }
        return (
            <div>
                <div className="wlc">
                    <Navbar.Header>
                        Welcome {this
                            .state.username}
                    </Navbar.Header>
                    {this.state.isAdmin ?
                        <LinkContainer to="/event">
                            <Button color="primary"> Create event</Button>
                        </LinkContainer> : ''
                    }
                </div>
                <EventSummary events={this.state.events}  isAdmin={this.state.isAdmin} handleClick={this.handleClick} />

            </div>
        );
    }
}
