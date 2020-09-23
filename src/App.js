import React, { Component } from 'react';
import './App.css';
import LoginForm from "./logincompo/LoginForm";
import Datainfo from "./datalist/Datainfo";
import ReactDOM from "react-dom";
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import Freezcolumn from "./datalist/Freezecolum";
import createRowData from "./datalist/createRowData";
import { BrowserRouter as Router, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Redirect } from 'react-router';

  class App extends Component {
    constructor(){
     super();
     this.state =  {
       list: {name: "hello"}
     }
    }
  render(){
    return (
    <div className="App">
      <Router>
          <Route path="/" exact>
            <Redirect to="/login"/>
          </Route>
          <Route path="/login">
          < LoginForm />
          </Route>
          <Route path="/datainfo">
            <Datainfo />
          </Route>
          <Route path="/freezcolumn">
            <Freezcolumn />
          </Route>
      </Router>
      <div>
        {this.state.list.name }
      </div>
    </div>

  );
}}

export default App;
