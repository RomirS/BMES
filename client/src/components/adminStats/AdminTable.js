import React, { Component } from 'react';
import { connect } from 'react-redux';
import './admin.css';
import { MDBDataTable } from 'mdbreact';



        const DatatablePage = ({user, list}) => {
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

