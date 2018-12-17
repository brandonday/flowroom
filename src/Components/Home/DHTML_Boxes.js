import React, { Component } from 'react';
import {Link} from 'react-router-dom';

 const DHTML_Boxes = (props) => (
    <div className="code-section" style={{height:props.height}}>   
        <textarea id="html_code" className="html_code"></textarea>
        <div id="html-box"></div>
        <textarea id="css_code" className="css_code"></textarea>
        <div id="css-box"></div>
        <textarea id="js_code" className="js_code"></textarea>
    </div>
)

export default DHTML_Boxes;