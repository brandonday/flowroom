import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Responsive from 'react-responsive';
import { OverflowDetector } from 'react-overflow';

require('velocity-animate');
require('velocity-animate/velocity.ui');
var VelocityComponent = require('velocity-react/src/velocity-component');

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

 const Description_Box = (props) => (
    <div>
        <Desktop>
            <VelocityComponent 
                animation={{ 
                    height:props.animation_height
                }} 
                duration={300}
            >
                <div className="overflow-detector">
                    <OverflowDetector 
                        className="overflow-detector" 
                        onOverflowChange={props.overflowchange} 
                        style={{overflow:props.overflow
                    }}>
                        <div id="text-for-overflow-detector" className="text-for-overflow-detector">
                            <p id="descriptionText" className="description-text">
                                { props.description_text }
                            </p>
                        </div>
                    </OverflowDetector>        
                </div>
            </VelocityComponent>
        </Desktop>
        <Tablet>
            <VelocityComponent 
                animation={{ 
                height: props.animation_height
            }} duration={300}
            >
                <div className="overflow-detector">
                    <OverflowDetector 
                        className="overflow-detector" 
                        onOverflowChange={props.overflowchange} 
                        style={{overflow:props.overflow}}>
                            <div id="text-for-overflow-detector" className="text-for-overflow-detector">
                                <p id="descriptionText" className="description-text">
                                    { props.description_text }
                                </p>
                            </div>
                    </OverflowDetector>        
                </div>
            </VelocityComponent>
        </Tablet>
        <Mobile>
            <VelocityComponent 
                animation={{ 
                height: props.animation_height
            }} duration={300}>
                <div className="overflow-detector">
                    <OverflowDetector 
                        className="overflow-detector" 
                        onOverflowChange={props.overflowchange} 
                        style={{overflow:props.overflow}}>
                        <div id="text-for-overflow-detector" className="text-for-overflow-detector">
                            <p id="descriptionText" className="description-text-mobile">
                                { props.description_text }
                            </p>
                        </div>
                    </OverflowDetector>        
                </div>
            </VelocityComponent>
        </Mobile>
    </div>
)

export default Description_Box;