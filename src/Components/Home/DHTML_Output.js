import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import FR_OBJECT from './FR_Object';
import Footer from './Footer.js';
import * as dat from 'dat.gui';
import {fabric} from 'fabric';
import Fullscreen from "react-full-screen";

const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const objects = [{}];
let fabricA = [];


 class DHTML_Output extends Component {
     constructor() {
        super();
        this.state = {
            isFull:false
        }
     }
     componentDidMount() {
        let that = this;
        const targetElement = document.querySelector("#output-container");
        let element = document.getElementById('draggable-box');
        // document.getElementById('fabricCanvas').addEventListener('mouseup',(e)=>{
        //     var rect = element.getBoundingClientRect();
        //     fabricA = [];
        //     fabricA.push({top:rect.top, right:rect.right, bottom:rect.bottom, left:rect.left});
           
        // });
        // document.getElementById('fabricCanvas').addEventListener('mousemove',(e)=>{
        //     if(fabricA.length > 0) {
        //         let x = e.pageX;
        //         let y = e.pageY;
        //         let rect = fabricA[0];
                
        //         if(x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
        //             //document.getElementById('items-overlay').style.pointerEvents = 'none';
        //             console.log('in div')
        //         } else {
        //             //document.getElementById('items-overlay').style.pointerEvents = 'auto';
        //             console.log('out div')
        //         }
        //     }
        // })
        disableBodyScroll(targetElement);

        localStorage.removeItem("FR_REMIX_LIST");
        localStorage.removeItem("remixhead");
        localStorage.removeItem("remixhead2");
        localStorage.removeItem("remixhead3");
    
        
        
        // (function(){
        //     var canvas = new fabric.Canvas('fabricCanvas');
        //     var text = new fabric.Text('hello world', { left: 100, top: 100 });
        //     fabricA.push({left:100,top:100});
           
        //     canvas.add(text);
        //     canvas.on('mouse:up', function(evt) {
        //         // inside opt you found `e`
        //         // you should be able to calculate where you clicked
        //         //var pointClicked = opt.target.canvas.getPointer(opt.e);
        //         // var modifiedObject = evt.target;
        //         // fabricA = [];
        //         // fabricA = [{left:modifiedObject.get('left'),top:modifiedObject.get('top')}];
        //       });
        //     window.addEventListener('resize', resizeCanvas, false);
          
        //     function resizeCanvas() {
        //       canvas.setHeight(window.innerHeight);
        //       canvas.setWidth(window.innerWidth);
        //       canvas.renderAll();
        //     }
          
        //     // resize on init
        //     resizeCanvas();
        //   })();
        
     }
     goFull = () => {
 
        //document.fullscreenEnabled = false
        if(document.fullscreenEnabled === true) {
        let iframe = document.getElementById('output_frame');
 
        iframe.style.height = '100%';
        iframe.style.width = '100%';
        iframe.style.transform = 'none';
        
        this.setState({ isFull: true });
        } else {
            alert('no ')
        }

    }


     render() {
        return (
            <div id="output-container" className="output-container">
                <div id="result-div" className="result">
                <Fullscreen
                    enabled={this.state.isFull}
                    onChange={(isFull) => {
                        this.setState({isFull,fullscreen:true});
                       
                    if(!isFull) {
                      
                
                        
                    }
                    }}>
                    <iframe id="output_frame" className="output_frame" src=""></iframe>
                    </Fullscreen>
                </div>
                <div id="out-cover">
       
                </div>
                <div id="full-screen" onClick={this.goFull.bind(this)} style={{
                            display:'flex',
                            color:'white',
                            height:'52px',
                            width:'48px',
                            flexDirection:'row',
                            alignItems:'center',
                            borderRight:'1px solid #181818',
                            borderBottom:'1px solid #181818',
                            justifyContent:'center',
                            position:'absolute',
                            right:'69px',
                            bottom:'-51px',
                            zIndex:'99999'
                                    }} 
                                    className="menu-bg-border">
                                     
                                    <i className="fas fa-expand" style={{
                                    fontSize:'15px',
                                    color:'white',
                                    marginBottom:'3px',
                                    position:'relative',
                                    left:'-8px'
                                    }}></i>
                                        <p id="full-text" style={{fontSize:15,fontWeight:'bold',color:'white',width:'22px'}}>Full</p>
                            </div>
                            
         {/* { 
                objects.map((i)=> {
                return (<FR_OBJECT id={i}/>)
                        })
            } 
            <canvas id="fabricCanvas">
            </canvas> */}
         
        
            
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