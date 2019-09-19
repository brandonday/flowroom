import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import FR_OBJECT from './FR_Object';
import Footer from './Footer.js';
import * as dat from 'dat.gui';
import {fabric} from 'fabric';
import Fullscreen from "react-full-screen";
import { Responsive, WidthProvider } from "react-grid-layout";
import _ from "lodash";
import Flow from './Flow.js'
import { connect } from 'react-redux';

const ResponsiveReactGridLayout = WidthProvider(Responsive);




 class DHTML_Output extends Component {
     constructor() {
        super();
        this.state = {
            isFull:false,
            objects:[],
            showGrid:false
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
            
        }

    }

    getObjects() {
        let i = 0;
        return _.map(this.state.objects,(obj)=> {
            i++;
           

            return (
              <div key={i} 
                data-grid={{x: 0, y: 0, w:3, h: 3, static: false,draggableHandle: ".dragHandle",
                draggableCancel:'.f-wrap',
            }} 
                
        
                style={{height:'100%',width:'100%',paddingBottom:30,backgroundColor:'black'}}>
            <span className="dragHandle">[DRAG HERE]</span>
                <div className="f-wrap" style={{height:'100%',width:'100%'}}>
                  <Flow shortID={obj.shortID} />
                </div>

        
              </div>
            );
          });
    }
     render() {
         if(this.props.state.flowAdd.flowAdd === true) {
             let getflows = document.getElementsByClassName('add-flow');
             for(let i = 0; i < getflows.length; i++){
                 getflows[i].addEventListener('click',()=>{
                    let getObj = this.state.objects;
                    getObj.push({shortID:getflows[i].id})
                    
                     this.setState({objects:getObj,showGrid:true})
                    
                 })
             }
             
         }
        return (
            <div id="output-container" className="output-container">
            
                <div id="result-div" className="result">
             
                {/* <Fullscreen
                    enabled={this.state.isFull}
                    onChange={(isFull) => {
                        this.setState({isFull,fullscreen:true});
                       
                    if(!isFull) {
                      
                
                        
                    }
                    }}> */}
                    <div style={{position:'absolute',height:'100%',width:'100%'}}>
                    {this.state.showGrid ?(<ResponsiveReactGridLayout
               
                    
          layouts={[
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 5, maxW: 5},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
          ]}
          className="layout"
          // WidthProvider option
    
          
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 5 }}
          compactType={'vertical'}
          autoSize={true}
          width={1200}
        >
          {this.getObjects()}
         
        </ResponsiveReactGridLayout>):(<Flow/> )  }
                    </div>
                    {/* </Fullscreen> */}
              
                </div>
                <div id="out-cover" style={{display:'block'}}>
                    
                </div>
          
                            
         {/* { 
                objects.map((i)=> {
                return (<FR_OBJECT id={i} monkey={10}/>)
                        })
            }  */}
            {/* <canvas id="fabricCanvas">
            </canvas>
          */}
        
            
        {/* <div id="preferences-bottom" className="preferences-bottom">
            <p className="preferencesLbls">Preferences</p>
            <p className="preferencesLbls">Clone</p>
            <p className="preferencesLbls">Report</p>
            <p className="preferencesLbls">Flag</p>
        </div> */}
    </div>)
     }
 }


 
  const ConnectedDHTML_Output = connect((state) => {
    return {
      state:state
    }
  })(DHTML_Output)
  

export default ConnectedDHTML_Output;

