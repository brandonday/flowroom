import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import FR_OBJECT from './FR_Object';
import Footer from './Footer.js';
import * as dat from 'dat.gui';
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const objects = [];



 class DHTML_Output extends Component {
     constructor() {
        super();
     }
     componentDidMount() {

        const targetElement = document.querySelector("#output-container");
        disableBodyScroll(targetElement);

        localStorage.removeItem("FR_REMIX_LIST");
        localStorage.removeItem("remixhead");
        localStorage.removeItem("remixhead2");
        localStorage.removeItem("remixhead3");
        
     }
   updateEditor() {
       alert('called');
   }
     render() {
    return(<div id="output-container" className="output-container">
        <div id="result-div" className="result">
            <iframe id="output_frame" className="output_frame" src=""></iframe>

        </div>
        {/* <div id="out-cover">
        
        </div> */}
            { 
                objects.map((i)=> {
                return (<FR_OBJECT id={i}/>)
                        })
            }
        {/* <div id="preferences-bottom" className="preferences-bottom">
            <p className="preferencesLbls">Preferences</p>
            <p className="preferencesLbls">Clone</p>
            <p className="preferencesLbls">Report</p>
            <p className="preferencesLbls">Flag</p>
        </div> */}
    </div>)
     }
 }


var calld = function() {
    DHTML_Output.updateEditor()
}

export default DHTML_Output;