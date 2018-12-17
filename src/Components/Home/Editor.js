import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Resizable, ResizableBox } from 'react-resizable';
import * as CodeMirror from 'codemirror';
import 'codemirror/theme/base16-light.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { OverflowDetector } from 'react-overflow';
import Responsive from 'react-responsive';
import DHTML_Labels from './DHTML_Labels';
import DHTML_Boxes from './DHTML_Boxes';
import ShowMore from './ShowMore.js';
import PreviewBar from './PreviewBar.js';
import RoomInfo from './RoomInfo.js';
import DHTML_Output from './DHTML_Output.js';
import EditorOptionsMobile from './EditorOptionsMobile.js';
import Description_Box from './Description_Box';
import ReactResizeDetector from 'react-resize-detector';
import { saveDHTML } from '../../actions/rooms';
import { connect } from 'react-redux';
import { OPEN_MODAL } from '../../actions/entireApp';
import AppModal from './AppModal';
import { firebase } from '../firebase/firebase';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;
require('velocity-animate');
require('velocity-animate/velocity.ui');
var VelocityComponent = require('velocity-react/src/velocity-component');
let i = -40;
require('codemirror/lib/codemirror.css');
require('codemirror/mode/htmlmixed/htmlmixed.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/javascript/javascript.js');

const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

class Editor extends Component {
    constructor() {
        super();
        this.state = {
            showSubComponent:false,
            showMoreBtn:'SHOW MORE',
            OverflowDetector:'hidden',
            overflowConstraints:[],
            tabIndex:0,
            componentUpdated:false,
            resizeableHeight:0,
            rotateTriangles:false,
            showMoreSection:false,
            isMobileHeightForResize:0,
            descriptionOverflows:false,
            libraries:['../jquery-3.3.1.min.js','../dat.gui.js','../fabric.js', '../darkroom.js','../lib/bodyScrollLock.js','../flowroom.js'],
            cssStyles:['../darkroom.css'],
            postVisible:'block',
            saveVisible:'block',
            remixVisible:'block',
            display:'none'
        }
        
     }
    componentDidMount() {
        localStorage.setItem("dhtml",JSON.stringify({html:"w",css:"w",js:"d"}));
        this.renderContent();
       
        //hack
        //this.setState({OverflowConstraints:[177,177]});
        //localStorage.getItem("html");

    
            const targetElement = document.querySelector("#full-page");
            disableBodyScroll(targetElement);
         
       

        
    }
    componentDidUpdate() {
      
        if(this.state.tabIndex === 0) {
            if (document.querySelector('.CodeMirror') === null) {
                this.renderContent();                 
            }
                       
        }
       
        
    }
    renderContent() {
        let base_tpl = "<!doctype html>\n" +
        "<html>\n\t" +
        "<head>\n\t\t" +
        "<meta charset=\"utf-8\">\n\t\t" +
        "<title>Test</title>\n\n\t\t\n\t" +
        "</head>\n\t" +
        "<body class='preview'>\n\t\n\t" +
        "</body>\n" +
        "</html>";

        let imageEditor = "<div id='myModal' class='modal'>\n" +
        "<div class='modal-content'>\n\n" +
        "<canvas id='final-result-canvas'></canvas>\n\t\t" +
        "<span class='close'>&times;</span>\n" +
        "<div id='output' style='backgroundColor:red'></div>\n" +
        "<div id='upload'>\n\t\t" +
        "<div id='drag-here'>\n\t\t" +
        "<p class='drag-here-text'>Drag a file here</p>\n\t\t" +
        "</div>\n\t\t" + 
        "<p class='drag-or'>or</p>\n\t\t" +
        "<div id='browse-file' style='position:absolute;'>Browse<div>\n\t\t" +
        "</div>\n" +
        "<div style='display:block'>\n\t" +
        "<img id='scream' src=''/>\n\t\t" +
        "</div>\n\t\t" +
        "<input id='img-file' type='file'/>\n\n\t\t\n\t" +
        "<input id='erase' type='checkbox' style='display:none;'/>\n\n\t\t\n\t" +
        "<button id='toBase64' type='button' style='display:none;'>addToAOILayer</button><br/> \n\t" +
        "<button id='saveImg' type='button'>Save</button><br/> \n\t" +
        "<div>\n\t\t";
        

        
        let modal_CSS = `body {font-family: Arial, Helvetica, sans-serif;}

        /* The Modal (background) */
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 21px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
        
        /* Modal Content */
        .modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
         
            width: 80%;
       
        }
        
        /* The Close Button */
        .close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        
        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
        
        #drag-here {
            font-size: 10px;
            height: 100px;
            width: 100px;
            border: dotted;
            justify-content: center;
            align-items: center;
            text-align: center;
            display: flex;
        }
        
        .drag-or {
            font-size: 14px;
        }

        #browse-file {
            font-size: 14px;
        }

        #upload {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .browse-btn {
            display: inline-block;
            color: #333;
            padding: 4px 15px;
            margin: 0 5px;
            border-radius: 3px;
            background-image: linear-gradient(to bottom,#e0e0e0,#b7b7b7);
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
        }

        canvas {
            -moz-user-select: none; cursor: crosshair;
        }

     
        
        `
        let prepareSource = () => {
          let html = HTML_EDITOR.getValue(),
          css = CSS_EDITOR.getValue(),
          js = JS_EDITOR.getValue(),
          src = '';
          src = base_tpl.replace('</body>', html + imageEditor + '</body>');
          css = '<style>' + css + modal_CSS + '</style>';
          src = src.replace('</head>', css + '</head>');
          js = '<script>' + js + '<\/script>';
          src = src.replace('</body>', js + '</body>');
          
          return src;
        };

        let renderDHTML = () => {
          let source = prepareSource();
          let iframe = document.querySelector('.output_frame'),
          iframe_doc = iframe.contentDocument;
          iframe_doc.open();
          iframe_doc.write(source);
          iframe_doc.close();
        if(this.state.libraries.length !== 0) {
            for(i = 0; i < this.state.libraries.length; i++) {
                var iFrameHead = iframe.contentWindow.document.getElementsByTagName("body")[0];
                var myscript = document.createElement('script');
                myscript.type = 'text/javascript';
                myscript.src = this.state.libraries[i];
                iFrameHead.appendChild(myscript);
            }

            if(this.state.cssStyles.length !== 0) {
                for(i = 0; i < this.state.cssStyles.length; i++) {
                    var iFrameHead = iframe.contentWindow.document.getElementsByTagName("head")[0];
                    var link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href=this.state.cssStyles[i];
                    link.type = 'text/css';
                    iFrameHead.appendChild(link);
                }
            }
            let html = HTML_EDITOR.getValue() || null;
            let css = CSS_EDITOR.getValue() || null;
            let js = JS_EDITOR.getValue() || null;
            
            
            this.props.saveDHTML({html, css, js});

        }
        //when removing last library, set to [];
         
         
        };
  
        let HTML_EDITOR = CodeMirror.fromTextArea(document.getElementById("html_code"), {
          lineNumbers: true,
          mode: "htmlmixed",
          theme: "base16-light",
          lineWrapping: true
        });
  
        let CSS_EDITOR = CodeMirror.fromTextArea(document.getElementById("css_code"), {
          lineNumbers: true,
          mode: "css",
          theme: "base16-light",
          lineWrapping: true
        });
  
        let JS_EDITOR = CodeMirror.fromTextArea(document.getElementById("js_code"), {
          lineNumbers: true,
          mode: "javascript",
          theme: "base16-light",
          lineWrapping: true
        });
  
        renderDHTML();

        
  
        HTML_EDITOR.on('change', (inst, changes) => {
          renderDHTML();
          let html = HTML_EDITOR.getValue();
          html = html === null ? '' : html; 
    
        });
        CSS_EDITOR.on('change', function(inst, changes) {
          renderDHTML();
          let css = CSS_EDITOR.getValue();
          css = css === null ? '' : css;
        
        });
        JS_EDITOR.on('change', function(inst, changes) {
          renderDHTML();
          let js = CSS_EDITOR.getValue();
      
         
        });

        let html = localStorage.getItem("html");
        let css = localStorage.getItem("css");
        let js = localStorage.getItem("js");
      
        var parts = window.location.pathname.split('/');
        let that = this;
        var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
        if(lastSegment !== 'room') {
            firebase.database().ref(`/rooms/${lastSegment}`).once('value').then(function(snapshot) {
            if(snapshot.val() !== null) {
              let html = snapshot.val().html;
              let css = snapshot.val().css;
              let js = snapshot.val().js;
              HTML_EDITOR.setValue(html);
              CSS_EDITOR.setValue(css);
              JS_EDITOR.setValue(js);
              //console.log(snapshot.val())
              let uid = snapshot.val().uid;
             
              //console.log(firebase.auth())
              if(firebase.auth().currentUser !== null) {
                let currentUser = firebase.auth().currentUser.uid;
                //alert(currentUser)
                
                if(currentUser === uid) {
                  //alert('the same');
                  console.log(that.state.saveVisible)
                  that.setState({saveVisible:'block'});
                  that.setState({postVisible:'block'});
                  that.setState({remixVisible:'block'});
                  
                } else {
                  //alert('not');
                  that.setState({saveVisible:'block'});
                  that.setState({postVisible:'block'});
                  that.setState({remixVisible:'block'});
                }
              } else {
                  that.setState({saveVisible:'block'});
                  that.setState({postVisible:'block'});
                  that.setState({remixVisible:'block'});
              }
            } else {
              //alert('not');
                that.setState({saveVisible:'block'});
                that.setState({postVisible:'block'});
                that.setState({remixVisible:'block'});
                HTML_EDITOR.setValue('');
                CSS_EDITOR.setValue('');
                JS_EDITOR.setValue('');
            } 
        
        }).catch((error) => {
          console.log(error)
        });
        
        }
     


        
    }
    editorDragStart() {
        document.getElementById('out-cover').style.display = 'block';
    }
    editorDragStop() {
        document.getElementById('out-cover').style.display = 'none';
        this.setState({resizableHeight:0});
    }
    handleOverflowChange(isOverflowed) {
        // let that = this;
        // if(isOverflowed === true) {
        //     document.getElementById('cover-strip').style.visibility = 'visible';
        //     document.getElementById('show-more-button').style.visibility = 'visible';
        //     document.getElementById('text-for-overflow-detector').style.wordWrap = 'break-word';
        //     that.setState({descriptionOverflows:true});
        // } 
    }
    showMore() {
        // if(!this.state.showSubComponent) {
        //     document.getElementById('descriptionText').style.padding = '0px 58px';
       
        //     this.setState(()=> {
        //         return { 
        //             showSubComponent:true,
        //             showMoreBtn:'SHOW LESS',
        //             OverflowDetector:'scroll',
        //             OverflowConstraints:[300,300]
        //         }
        //     });

        //     setTimeout(()=> {
        //         this.setState(()=> {
        //             return { 
        //                 resizeableHeight:300   
        //             }
        //         });
        //     },300)

        // } else {
        //     document.getElementById('descriptionText').style.padding = '0px 58px';
            
        //     this.setState((prevState, props) => {
        //         return {
        //             showSubComponent:false,
        //             showMoreBtn:'SHOW MORE',
        //             OverflowDetector:'hidden',
        //             OverflowConstraints:[177,177]
        //         }
        //     });
        //     setTimeout(()=> {
        //         this.setState(()=> {
        //             return { 
        //                 resizeableHeight:177 
        //             }
        //         });
        //     },300)
        // }    
       
    }
    resizeFunc(event) {
        
        // let resizeHeight = document.getElementById('resizable-box').clientHeight;
        // this.setState((prevState, props) => {
        //     return {
        //         resizeableCurrentHeight:resizeHeight,
        //         rotateTriangles:true
        //     }
        // });
        // if(resizeHeight > 220) {
        //     this.setState((prevState, props) => { return { rotateTriangles:-90 } });
        // } else if(resizeHeight < 200) {
        //     this.setState((prevState, props) => { return { rotateTriangles: 0 } });
        // } else if(this.state.showSubComponent === true && resizeHeight > 400) {
        //     this.setState((prevState, props) => { return { rotateTriangles:-90 } });
        // } else if(resizeHeight < 400) {
        //     this.setState((prevState, props) => { return { rotateTriangles: 0 } });
        // }
        
        // let codeTriangle1 = document.getElementsByClassName('down-editor-3x')[0];
        // let codeTriangle2 = document.getElementsByClassName('down-editor-3x')[1];
        // let codeTriangle3 = document.getElementsByClassName('down-editor-3x')[2];

    }
    resizeAnimationComplete () {

    }
    convertLikes() {
        let likes = this.props.likes;
        if(likes > 9999) {
           return likes > 9999 ? (likes/1000).toFixed(1) + 'K' : likes
        } else if(likes > 999) {
           return likes > 999 ? (likes/10000).toFixed(1) + 'K' : likes
        } else {
            return likes
        } 
    }
    isResizing(width, height) {
        // let that = this;
        // if(width <= 767) {
        //     document.getElementById('output_frame').style.paddingBottom = '74px';
        //     document.getElementById('preferences-bottom').style.display = 'flex';
        //     if (document.querySelector('.show-more-preview-bar-wrap-mobile') !== null) {
        //         if(that.state.descriptionOverflows === true) {
        //             document.getElementById('cover-strip').style.visibility = 'visible';
        //             document.getElementById('show-more-button').style.visibility = 'visible';
        //             document.getElementById('text-for-overflow-detector').style.wordWrap = 'break-word';
        //         }
        //     }
        //     document.getElementById('resizable-box').style.height = '269px';
        //     this.setState({resizableHeight:269});
        //     this.setState({isMobileHeightForResize:269});
        //     this.setState({OverflowConstraints:[269,269]});
        //     //this.setState({OverflowConstraints:177});
        // } else  {
        //     document.getElementById('output_frame').style.paddingBottom = '0px';
        //     document.getElementById('preferences-bottom').style.display = 'none';
        //     if (document.querySelector('.show-more-preview-bar-wrap') !== null) {
        //         if(that.state.descriptionOverflows === true) {
        //             document.getElementById('cover-strip').style.visibility = 'visible';
        //             document.getElementById('show-more-button').style.visibility = 'visible';
        //             document.getElementById('text-for-overflow-detector').style.wordWrap = 'break-word';
        //         }
        //     }
        //     //document.getElementById('resizable-box').style.height = '135px';
        //     this.setState({resizableHeight:177});
        //     this.setState({isMobileHeightForResize:177});
        //     this.setState({OverflowConstraints:[177,177]});
        // }  
        
      
    }
    remix() {
        var iframe = document.getElementById("output_frame");
        var elmnt = iframe.contentWindow.document.getElementsByClassName("remix")[0];
        elmnt.addEventListener('mouseover', ()=> {
            elmnt.style.outlineStyle = 'solid';
            elmnt.style.outlineColor = ' #7dff7d';
            elmnt.style.cursor = 'pointer';

        });
        elmnt.addEventListener('mouseout', ()=> {
            elmnt.style.outlineStyle = 'none';
            elmnt.style.pointer = '';
        });
        elmnt.addEventListener('click', ()=> {

        });

        //check if has a background image property or is an img element 
        //really mobile friendly looking

    }
closeDescription() {
    //this.setState({OverflowConstraints:[0,0]});
    this.setState({showSubComponent:false})
    alert('called')
}

injectJS() {
       
}

    render() {
        return (<div id="full-page" className="full-page">
            <div className="top-boxes editor-parent">
                <VelocityComponent 
                    id="velocity-box" 
                    height={'100%'} 
                    animation={{ 
                        height:this.state.showSubComponent ? 0 : this.state.isMobileHeightForResize
                    }} 
                    duration={0} 
                    complete={this.resizeAnimationComplete.bind(this)}>
                    <ResizableBox id="resizable-box" 
                        height={this.state.resizeableHeight} 
                        onResize={this.resizeFunc.bind(this)} 
                        onResizeStart={this.editorDragStart.bind(this)} 
                        onResizeStop={this.editorDragStop.bind(this)} 
                        draggableOpts={{}} 
                        minConstraints= {
                            [0,0]
                    }>
                        <EditorOptionsMobile/>
                        {/* <RoomInfo 
                            name={this.props.name} 
                            likes={this.convertLikes()}
                            callback={this.remix.bind(this)}
                            close={this.closeDescription.bind(this)}
                            post={this.openModal.bind(this)}
                            postVisible={this.state.postVisible}
                            remixVisible={this.state.remixVisible}
                            saveVisible={this.state.saveVisible}
                        /> */}
                        {/* <Description_Box 
                            description_text={this.props.descriptionText} 
                            animation_height={this.state.showSubComponent ? 272 : 110}
                            overflowchange={this.handleOverflowChange.bind(this)}
                            overflow={this.state.OverflowDetector}

                        /> */}
                        <Default>
                        {/* <div className="show-more-preview-bar-wrap">
                            <ShowMore 
                                tags={this.props.tags} 
                                text={this.state.showMoreBtn}
                                clicked={this.showMore.bind(this)}
                                />   
                            <PreviewBar/> 
                        </div> */}
                        {/* <ReactResizeDetector handleWidth handleHeight onResize={this.isResizing.bind(this)} /> */}
                        </Default>
                        {/* <Mobile>
                            <div className="show-more-preview-bar-wrap-mobile">
                                <ShowMore 
                                    tags={this.props.tags} 
                                    text={this.state.showMoreBtn}
                                    clicked={this.showMore.bind(this)}
                                />   
                                <ReactResizeDetector handleWidth handleHeight onResize={this.isResizing.bind(this)} />
                                <PreviewBar/> 
                            </div>
                        </Mobile> */}
                        <DHTML_Labels RotateTriangles={this.state.rotateTriangles}/>
                        <DHTML_Boxes height={this.state.resizeableCurrentHeight }/>
                    </ResizableBox>
                </VelocityComponent>
            </div>
            <DHTML_Output/>
            <AppModal/>
        </div>)
    }
    
}
const mapDispatchToProps = (dispatch) => ({
  openModal: (modal) => dispatch(OPEN_MODAL(modal)),
  saveDHTML: (dhtml) => dispatch(saveDHTML(dhtml))
});
const ConnectedEditor = connect((state) => {
  return {
    state:state
  }
},mapDispatchToProps)(Editor)

export default ConnectedEditor;