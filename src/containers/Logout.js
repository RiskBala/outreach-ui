import React, { Component } from "react";
import "./Home.css";
import { getAuthToken, getUserName } from "../Session";
import {setAuthToken, setUserName} from "../Session";



import {  Navbar } from "react-bootstrap";

export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: getUserName(),
            authtoken: getAuthToken(),
            trips: []
        };
    }

    componentDidMount() {
        this.props.userHasAuthenticated(false);
        setAuthToken('');
       setUserName('');
      console.log(this.state.isAuthenticated);
    }



    render() {

        return (
            <div>
                <div className="wlc">
                    <Navbar.Header>
                        Welcome to OutReach programme
                    </Navbar.Header>
                </div>
        

            </div>
        );
    }
}
