import React, { Component } from 'react';
import {Link} from 'react-router-dom';
require('velocity-animate');
require('velocity-animate/velocity.ui');
var VelocityComponent = require('velocity-react/src/velocity-component');

 const DHTML_Labels = (props) => (
    <div className="dhtml-labels-wrap">
        <div className="code-box-labels">
            <div className="code-box-label">
                <div className="code-label-wrapper">
                    <p className="code-label-html">HTML</p>
                    <VelocityComponent 
                        animation={{ 
                        rotateZ: props.RotateTriangles,
                        transformOriginY: ['42%', '42%']
                    }} duration={300}>
                        <div className="down-editor-3x"></div>
                    </VelocityComponent>
                </div>
            </div>
            <div className="code-box-label">
                <div className="code-label-wrapper">
                    <p className="code-label-css">CSS</p>
                    <VelocityComponent 
                        animation={{ 
                        rotateZ: props.RotateTriangles,
                        transformOriginY: ['42%', '42%']
                    }} duration={300}>
                        <div className="down-editor-3x"></div>
                    </VelocityComponent>
                </div>
            </div>
            <div className="code-box-label">
                <div className="code-label-wrapper">
                <p className="code-label-js">JavaScript</p>
                <VelocityComponent 
                    animation={{ 
                    rotateZ: props.RotateTriangles,
                    transformOriginY: ['42%', '42%']
                }} duration={300}>
                    <div className="down-editor-3x"></div>
                </VelocityComponent>
            </div>    
        </div>
    </div>
</div>
)

export default DHTML_Labels;



