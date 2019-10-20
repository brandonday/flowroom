import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import FR_OBJECT from './FR_Object';
import Footer from './Footer.js';
import * as dat from 'dat.gui';
import {fabric} from 'fabric';
import Fullscreen from "react-full-screen";
import SimpleLineIcon from 'react-simple-line-icons';
import { firebase } from '../firebase/firebase';

import { Responsive, WidthProvider } from "react-grid-layout";
import _ from "lodash";
import Flow from './Flow.js'
import Overlay from './overlay.js'

import { connect } from 'react-redux';
import ResizableRect from 'react-resizable-rotatable-draggable'
import { Stage, Layer, Rect, Transformer } from "react-konva";
import { isFulfilled } from 'q';

import {flowAdd} from '../../actions/flowAdd.js';
import { loadRemix } from '../../actions/loadRemix';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
let counter = 0;



 class DHTML_Output extends Component {
     constructor() {
        super();
        this.state = {
            isFull:false,
            objects:[{}],
            showGrid:false,
            maxobj:0,
            makeDrop:false
        
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
 
        //  localStorage.removeItem("FR_REMIX_LIST");
        // localStorage.removeItem("remixhead");
        // localStorage.removeItem("remixhead2");
        // localStorage.removeItem("remixhead3");
    
        
        
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
     
      
        return this.state.objects.map((obj,index)=> {
        
           console.log('object', obj)
           counter++;
            return (
              <div id={`${obj.shortID}_`} key={obj.shortID} className="flow"
                data-grid={{x: 0, y: 0, w:3, h: 3, static:false
                }} 
                
        
                style={{height:'100%',width:'100%',backgroundColor:'black'}} onClick={()=>{
                 
                  let getAllFlowsSelected = document.getElementsByClassName('selected_flow');
                  let getAllOver = document.getElementsByClassName('flow')
                  let getoutPutFrame = document.getElementsByClassName('output_frame');
                  for(let i = 0; i < getAllFlowsSelected.length; i++) {
                    //getAllFlowsSelected[i].childNodes[0].childNodes[0].style.display = 'none';
                 
                    getAllFlowsSelected[i].className = 'flow'
                    
                  }

                  // for(let y = 0; y < getAllOver.length; y++){
                  //   getAllOver[y].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.pointerEvents = 'none';

                  //   getAllOver[y].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].style.pointerEvents = 'all';

                  // }
                  // for(let i = 0; i < getoutPutFrame.length; i++) {
                    
                  //   getoutPutFrame[i].className = '';
                    
                  // }
                  // document.getElementById(getAllOver[0].childNodes[0].offsetParent.id).childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].className = 'output_frame'

                  console.log('flow', )
                 
                  document.getElementById(`${obj.shortID}_`).className = 'flow selected_flow';
                  document.getElementById(`${obj.shortID}_`).childNodes[0].childNodes[0].style.display = 'flex'
                  
                  //document.getElementById(`${obj.shortID}_`).childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].style.pointerEvents = 'all'
                  console.log('dfdfdf',document.getElementById(getAllOver[0].childNodes[0].offsetParent.id).childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0])
                  this.props.flowAdd({flowAdd:obj.shortID});
                  document.getElementById('remix-image-box').remove()
                  this.props.loadRemix({loadRemix:'load'});
              
                  // let overlayContainer = document.createElement('div');
                  // overlayContainer.style.position = 'absolute';
                  // overlayContainer.style.top = '0px';
                  // overlayContainer.style.left = '0px';
                  // overlayContainer.style.bottom = '0px';
                  // overlayContainer.style.height = '100%';
                  // overlayContainer.style.width = '100%';
                  // overlayContainer.setAttribute("id", "overlay-container");
                  //if(document.getElementsByClassName('selected_flow') !== undefined) {
                  // let getSelectedFlow = document.getElementsByClassName("selected_flow")[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].contentDocument.body.appendChild(overlayContainer)

                  //  console.log('selected', getSelectedFlow)
                  // getSelectedFlow.contentDocument.body.appendChild(overlayContainer);
                  // for(let i = 0; i < getAllFlowsSelected.length; i++) {
                  //   if(getSelectedFlows[i].className === 'selected_flow') {
                     
                  //   }
                  // }

              //     let short =''
              //            let func = function(snapshot) {
              //                       let html,css,js
              //                       if(snapshot.val() !== null) {
              //                           let urlHTML = snapshot.val().urlHTML;
              // let urlCSS = snapshot.val().urlCSS;
              // let urlJS = snapshot.val().urlJS;
              
              
              // if(urlHTML !== undefined && urlHTML !== '') {
              //   fetch(urlHTML).then((response)=> {
              //     if (!response.ok) {
              //       return;
              //     }
              //     return response.text();
              //   }).then((data)=> {
              //     html = data;
              //     html = html === undefined || html === null ? '' : html;
              //     //HTML_EDITOR.setValue(html);
              //     html = html;
              //      console.log('html', html)
              //   });
      
              // } else {
              //   html = html === undefined || html === null ? '' : html;
              //   //HTML_EDITOR.setValue(html);
              // }

              // if(urlCSS !== undefined && urlCSS!== '') {
              //   fetch(urlCSS).then(function(response) {
              //     if (!response.ok) {
              //       return;
              //     }
              //    return response.text();
              //   }).then(function(data){
              //     css = data;
              //     css = css === undefined || css === null ? '' : css;
              //     //CSS_EDITOR.setValue(css);
              //   });
      
              // } else {
              //   css = css === undefined || css === null ? '' : css;
              //   //CSS_EDITOR.setValue(css);
              // }

              // if(urlJS !== undefined && urlJS !== '') {
              //   fetch(urlJS).then(function(response) {
              //     if (!response.ok) {
              //       return;
              //     }
              //     return response.text();
              //   }).then(function(data){
              //     js = data;
              //     js = js === undefined || js === null ? '' : js;
              //     //JS_EDITOR.setValue(js);
              //   });
      
              // } else {
              //   js = js === undefined || js === null ? '' : js;
              //   //JS_EDITOR.setValue(js);
              // }
              // console.log('html', html)
              // console.log('html', html)
              // console.log('html', html)
              // localStorage.setItem(`${short}`,JSON.stringify({html:html,css:css,js:js}))
                                       
              //                       }
              //                   }
              //                   firebase.database().ref(`/rooms/${short}`).once('value').then(func) 
                
                }}>
                <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <span className="options_bar" style={{display:'none',alignItems:'center',justifyContent:'center', backgroundColor:'#212121',
                    border:'1px solid #40FFE8',
                    borderRadius:'3px',
                    width:'184px',
                    height:'30px',
                    position:'absolute',
                    bottom:'-40px',transition:'display 1s ease-out'}}>
                    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',width:'100%'}}>
                    <svg width="20px" height="12px" viewBox="0 0 26 10" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Mobile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Mobile---Text-v0.2" transform="translate(-16.000000, -522.000000)"><g id="Group-3" transform="translate(16.000000, 522.000000)"><g id="Clip-2"></g><path class="menubg-s" d="M22.9372988,6.65081888 C22.0968687,7.71528957 20.5814734,8.24279316 19.1316086,7.86285038 C18.4226493,7.67743549 17.7177856,7.37074736 17.1280101,6.98694907 C16.237613,6.40722088 15.4491978,5.71182745 14.5555241,5.01783602 C15.9775383,3.81001053 17.2275348,2.5815055 19.1524965,2.1451321 C20.6449561,1.8065484 22.0882679,2.22048976 22.8926561,3.20504628 C23.716294,4.21308636 23.735134,5.6406758 22.9372988,6.65081888 M8.12533283,7.39598341 C7.19315988,7.95818657 6.08569255,8.12642692 4.9589756,7.88142691 C3.1409107,7.4860621 2.08791569,5.86639826 2.57652831,4.27792899 C3.06759833,2.68244971 4.93644946,1.67581163 6.77785964,2.12620506 C7.57200873,2.32038246 8.34567951,2.69296473 9.01491088,3.1160191 C9.8598462,3.6498317 10.5892838,4.31858708 11.5456212,5.06725662 C10.3443632,5.89338682 9.27990029,6.69953848 8.12533283,7.39598341 M19.1369329,0.106619902 C17.1079414,0.423472554 15.5970512,1.4651607 14.1762657,2.63408061 C13.7867681,2.95478877 13.4902421,3.3589161 13.2129657,3.65789322 C11.893343,2.69787174 10.8358427,1.84264998 9.67554136,1.10554696 C7.99140464,0.0354682552 6.09716041,-0.28769341 4.0579297,0.267499733 C1.54933598,0.950275139 -0.0496109391,2.90747117 0.00117528469,5.21481742 C0.0490945443,7.41666296 1.61773355,9.24347272 3.99977128,9.79305785 C6.22658337,10.3065414 8.24861229,9.84037545 10.037598,8.66164152 C11.0721625,7.98026812 12.0174416,7.20005351 12.9938477,6.47101201 C14.0554436,7.26033963 15.0572428,8.07840832 16.1470988,8.7983368 C17.7169665,9.83511794 19.5002183,10.2374928 21.4751471,9.84633396 C24.6628017,9.21473166 26.5611416,6.5628432 25.8517728,3.73184887 C25.2001528,1.13078301 22.3495712,-0.395297132 19.1369329,0.106619902" id="Fill-1" fill="#FFFFFF" mask="url(#mask-2)"></path></g></g></g></svg>
                    <svg width="25px" height="25px" viewBox="0 0 23 23" version="1.1">

    <defs></defs>
    <g id="Elements" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Overlay3" transform="translate(0.000000, 1.000000)">
            <polygon id="Triangle" stroke="#40ffe8" stroke-width="0.8" fill="#40ffe8" points="5 1 9 9 1 9"></polygon>
            <text id="T" font-family="AmericanTypewriter, American Typewriter" font-size="13" font-weight="600" fill="#40ffe8">
                <tspan x="13" y="21">T</tspan>
            </text>
            <g id="happiness" transform="translate(13.000000, 0.000000)">
                <circle id="Oval-5" stroke="#40ffe8" fill="#40ffe8" cx="4.5" cy="4.5" r="4.5"></circle>
                <circle id="Oval" fill="#000" fill-rule="nonzero" cx="2.5" cy="3" r="0.8"></circle>
                <circle id="Oval" fill="#000" fill-rule="nonzero" cx="6.5" cy="3" r="0.8"></circle>
                <path d="M4.49084983,7 C5.49167755,7 6.45082836,6.37673485 7,5.34190996 L6.56548027,5 C6.06118648,5.95025297 5.13876567,6.48055988 4.2151162,6.35078843 C3.49532469,6.24971947 2.82969051,5.74472902 2.4344874,5 L2,5.34190996 C2.47820126,6.24310491 3.28412721,6.85416462 4.15581795,6.97661279 C4.26772158,6.99232238 4.37946354,7 4.49084983,7 Z" id="Shape" fill="#000" fill-rule="nonzero"></path>
            </g>
            <g id="iconmonstr-favorite-3" transform="translate(0.000000, 12.000000)" fill="#40ffe8" fill-rule="nonzero">
                <path d="M5,1.32878377 C3.68833333,-0.88110905 0,-0.235977438 0,2.53313853 C0,4.43989722 2.32125,6.38961013 5,9 C7.67916667,6.38961013 10,4.43989722 10,2.53313853 C10,-0.245386459 6.30208333,-0.864745534 5,1.32878377 Z" id="Shape"></path>
            </g>
        </g>
    </g>
</svg>                 <div>
                    <SimpleLineIcon name="cursor-move" style={{border:'1pxsolid #40FFE8'}} color="#40FFE8"/>
                    </div>
                    <SimpleLineIcon name="speech" style={{border:'1pxsolid #40FFE8'}} color="#40FFE8"/>
                    <svg width="6px" height="16px" viewBox="0 0 6 26" version="1.1">

    <defs></defs>
    <g id="Elements" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group-4" transform="translate(1.000000, 1.000000)" fill="#40ffe8" stroke="#40ffe8">
            <g id="Group-3">
                <g id="Ellipsis-Vertical-Filled">
                    <circle id="Oval-4" cx="2" cy="12" r="2"></circle>
                    <circle id="Oval-4" cx="2" cy="2" r="2"></circle>
                    <circle id="Oval-4" cx="2" cy="22" r="2"></circle>
                </g>
            </g>
        </g>
    </g>
</svg>

{/* <svg width="18px" height="14px" viewBox="0 0 18 14" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Mobile" stroke="none" stroke-width="1" fill-rule="evenodd"><g id="Mobile---Text-v0.2" transform="translate(-149.000000, -520.000000)"  fill="rgb(64, 255, 232)" fill-rule="nonzero"><path id="script-p" d="M154.625307,531.477701 L154.13337,531.987689 C154.005466,532.120286 153.808691,532.120286 153.680787,531.987689 L149.095928,527.234595 C148.968024,527.101998 148.968024,526.898002 149.095928,526.765405 L153.680787,522.012311 C153.808691,521.879714 154.005466,521.879714 154.13337,522.012311 L154.625307,522.522299 C154.753211,522.654897 154.753211,522.858892 154.625307,522.991489 L150.758677,527 L154.625307,531.008511 C154.753211,531.141108 154.753211,531.345103 154.625307,531.477701 Z M160.440011,520.594542 L156.770156,533.76245 C156.720962,533.935846 156.543864,534.037844 156.386444,533.986845 L155.776442,533.813449 C155.609183,533.76245 155.510795,533.578854 155.559989,533.405458 L159.229844,520.23755 C159.279038,520.064154 159.456136,519.962156 159.613556,520.013155 L160.223558,520.186551 C160.390817,520.23755 160.489205,520.421146 160.440011,520.594542 Z M166.904072,527.234595 L162.319213,531.987689 C162.191309,532.120286 161.994534,532.120286 161.86663,531.987689 L161.374693,531.477701 C161.246789,531.345103 161.246789,531.141108 161.374693,531.008511 L165.241323,527 L161.374693,522.991489 C161.246789,522.858892 161.246789,522.654897 161.374693,522.522299 L161.86663,522.012311 C161.994534,521.879714 162.191309,521.879714 162.319213,522.012311 L166.904072,526.765405 C167.031976,526.898002 167.031976,527.101998 166.904072,527.234595 Z" class="menubg-s"></path></g></g></svg>
                    <SimpleLineIcon name="lock" style={{border:'1pxsolid #40FFE8'}} color="#40FFE8"/>
                   */}
                    </div>
                  </span>
                </div>
                <div className="f-wrap" style={{height:'100%',width:'100%'}}>
                  <div style={{height:'100%',width:'100%'}} >
               
                  <Flow shortID={obj.shortID} index={index} pointerEvents={'none'}/>
                  {/* <Overlay/> */}
                  </div>
                </div>

        
              </div>
            );
         
          });
          
    }
   shouldComponentUpdate(props,state) {
    //  alert(props.state.openMenu.openMenu )
      if(props.state.openMenu.openMenu === true || props.state.openMenu.openMenu === false) {
        return null
      } else {
        
        return true
      }
  
   }

     render() {
       let {flowAdd} = this.props.state.flowAdd
       let exists = document.getElementById(`${flowAdd}_output_frame`) !== null ? flowAdd : null;
       exists = exists === flowAdd ? 'already exists' : flowAdd; 
     
        if(flowAdd !== '' && exists !== 'already exists') {
         
                let getObj = this.state.objects;
                getObj.push({shortID:flowAdd})   
         
                
         
            const MAX_OBJECTS = 1;
            function addFlow(state, props) {
                
                if (state.maxobj === MAX_OBJECTS) {
         
                  return null;
                } 
                    
               
                return {objects:this.state.objects.concat([{shortID:flowAdd}]),showGrid:true,objects:[],maxobj:state.maxobj + 1}

              }
              
            
              this.setState(addFlow)
            
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

         
        </ResponsiveReactGridLayout>):(<Flow pointerEvents={'all'}/> )  }
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


 const mapDispatchToProps = (dispatch) => ({
  flowAdd: (bool) => dispatch(flowAdd(bool)),
  loadRemix: (string) => dispatch(loadRemix(string))
});
// const ConnectedEditor = connect((state) => {
//   return {
//     state:state
//   }
// },mapDispatchToProps)(Editor)

// export default ConnectedEditor;
 
  const ConnectedDHTML_Output = connect((state) => {
    return {
      state:state
    }
  },mapDispatchToProps)(DHTML_Output)
  

export default ConnectedDHTML_Output;

