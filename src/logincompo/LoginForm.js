import React, {Component} from "react";
import "./login.css";
import { withRouter } from 'react-router';

import Datainfo from "../datalist/Datainfo"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onSubmit = (event) => {
      event.preventDefault();
    if(this.state.email){
        console.log(this.state.email);
        // return  <Redirect  to="/datainfo" />
        this.props.history.push('/datainfo');
    }
 }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={this.handleChange}
        />
        <label htmlFor="email">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={this.handleChange}
        />
        <button onClick={this.onSubmit}>Login</button>
      </form>
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
}

export default withRouter(LoginForm);
