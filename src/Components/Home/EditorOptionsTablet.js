import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Responsive from 'react-responsive';
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

 const EditorOptionsTablet = () => (
    <Tablet>
        <div className="editor-options-desktop">
            <div className="display-wrap">
                <div className="display-icon" style={{
    height:'19px',
    width:'15px',
    marginRight:'6px',
    backgroundImage:'url(/images/display.png)',
    backgroundSize:'15px 19px',
    backgroundRepeat:'no-repeat'}}></div>
                <p className="display-text">Display</p>
            </div>
            <div className="draw-wrap">
                <div className="draw-icon" style={{
    height:'19px',
    width:'15px',
    marginRight:'6px',
    backgroundImage:'url(/images/draw.png)',
    backgroundSize:'15px 19px',
    backgroundRepeat:'no-repeat'}}></div>
                <p className="draw-text">Draw</p>
            </div>
            <div className="lock-editor-wrap">
                <div className="editor-icon" style={{
    height:'19px',
    width:'15px',
    marginRight:'6px',
    backgroundImage:'url(/images/lock.png)',
    backgroundSize:'15px 19px',
    backgroundRepeat:'no-repeat'}}></div>
                <p className="lock-editor-text">Editor</p>
            </div>
        </div>
    </Tablet>
)

export default EditorOptionsTablet;