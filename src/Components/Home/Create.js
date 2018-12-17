import React, { Component } from 'react';
import {Link} from 'react-router-dom';

 class Create extends Component {
     constructor() {
         super();
         this.state = {}
     }
     componentDidMount() {
         document.getElementById('create').className = 'create-show';
     }
     render() {

        return (
            <div className="" style={{flex:'1',display:'flex'}}>
            
       
            </div> )
    }
 }

export default Create;