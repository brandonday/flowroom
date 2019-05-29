import React, { Component } from 'react';
import {Link} from 'react-router-dom';


function getTheNodes() {

}

 const DHTML_Boxes = (props) => (
    <div className="code-section" style={{height:props.height}}>   
        <textarea id="html_code" className="html_code"></textarea>
        <div id="html-box"></div>
        <textarea id="css_code" className="css_code"></textarea>
        <div id="css-box"></div>
        <textarea id="js_code" className="js_code"></textarea>
        <div style={{position:'absolute',left:0,right:0,bottom:0,height:'100%',width:'100%'}}></div>
    </div>
)

export default DHTML_Boxes;