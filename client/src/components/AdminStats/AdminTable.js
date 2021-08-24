import React from 'react';
import './admin.css';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = ({list}) => {
  const data = list;
  return(
    <div className = "tablee">
    <MDBDataTable 
      responsive
      autoWidth
      scrollX
      striped
      bordered
      small
      data={data}/>
    </div>
  )};

export default DatatablePage;