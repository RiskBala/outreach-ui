import React, { Component, Fragment } from "react";
import './App.css'
import { Link } from "react-router-dom";
import axios from 'axios'
import Routes from "./Routes";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";



class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      isAuthenticated: false,
      isAuthenticating: true
    }
    this.handleClick = this.handleClick.bind(this);
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

 

  handleClick() {
    this.setState({ username: 'risk' });

    axios.get('https://api.github.com/users/maecapozzi')
      .then(response => this.setState({ username: response.data.name }))
 
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className='button__container'>
        {/*<button className='button' onClick={this.handleClick}>Click Me</button>
                abc<p>{this.state.username}</p>*/}
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">OutReach system</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.isAuthenticated
                  ?<LinkContainer to="/logout">
                      <NavItem>Logout</NavItem>
                    </LinkContainer>
                  : <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        
        <Routes childProps={childProps} />
      </div>
    )

  }
}
export default App