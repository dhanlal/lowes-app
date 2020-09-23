import React, { Component } from 'react';
import ReactDOM from "react-dom";
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

import createRowData from "./createRowData";
import { BrowserRouter as Router, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Redirect } from 'react-router';
const COLUMN_WIDTH = 140;

const columns = [
  {
    key: "id",
    name: "ID",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "title",
    name: "Title",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "firstName",
    name: "First Name",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "lastName",
    name: "Last Name",
    frozen: true,
    width: COLUMN_WIDTH
  },
  {
    key: "email",
    name: "Email",
    width: COLUMN_WIDTH
  },
  {
    key: "street",
    name: "Street",
    width: COLUMN_WIDTH
  },
  {
    key: "zipCode",
    name: "ZipCode",
    width: COLUMN_WIDTH
  },
  {
    key: "date",
    name: "Date",
    width: COLUMN_WIDTH
  },
  {
    key: "bs",
    name: "bs",
    width: COLUMN_WIDTH
  },
  {
    key: "catchPhrase",
    name: "Catch Phrase",
    width: COLUMN_WIDTH
  },
  {
    key: "companyName",
    name: "Company Name",
    width: COLUMN_WIDTH
  },
  {
    key: "sentence",
    name: "Sentence",
    width: COLUMN_WIDTH
  }
];
const ROW_COUNT = 10;
const rows = createRowData(10);
class Freezecolum extends Component{
   render(){
       return(
        <div className="App">
            <ReactDataGrid
            columns={columns}
            rowGetter={i => rows[i]}
            rowsCount={ROW_COUNT}
            minHeight={600} />
        </div>);
   }
}
export default Freezecolum;