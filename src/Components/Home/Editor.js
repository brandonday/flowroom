import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Resizable, ResizableBox } from 'react-resizable';
import * as CodeMirror from 'codemirror';
import 'codemirror/theme/dracula.css';
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
import { Update_Editor } from '../../actions/updateEditor';
import { Store } from './store.js';
import { tween, styler } from 'popmotion';
import AppModal from './AppModal';
import { firebase } from '../firebase/firebase';
import * as dat from 'dat.gui';



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
let updateHTML;
let update_html;
let calledRenderC = false;
let HTML_EDITOR;
let CSS_EDITOR;
let JS_EDITOR;


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
            libraries:['https://html2canvas.hertzen.com/dist/html2canvas.min.js'],
            cssStyles:['../darkroom.css'],
            postVisible:'block',
            saveVisible:'block',
            remixVisible:'block',
            display:'none',
            updateHTML:''
        }
        
     }
    componentDidMount() {
  
  
      document.getElementById('out-cover').style.display = 'none';
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
 
        if(Store.getState().updateEditor.before !== undefined) {
            if(Store.getState().calledAlready.calledAlready.calledAlready === false) {
                let update = Store.getState().updateEditor;
                this.renderContent2(update.before, update.before.updateHTML);
                
            } 
        } 
       
    }
    renderContent(before = null, htmlUpdate = null, cssUpdate = null, jsUpdate = null) {
  
        let base_tpl = "<!doctype html>\n" +
        "<html>\n\t" +
        "<head>\n\t\t" +
        "<meta charset=\"utf-8\">\n\t\t" +
        "<title>Test</title>\n\n\t\t\n\t" +
        "</head>\n\t" +
        "<body class='preview'>\n\t\n\t" +
        "</body>\n" +
        "</html>";
        
        
     
        let prepareSource = () => {
          let html = HTML_EDITOR.getValue(),
          css = CSS_EDITOR.getValue(),
          js = JS_EDITOR.getValue(),
          JSflowroom = '<script src="../flowroom.js"></script>',
          src = '';
          src = base_tpl.replace('</body>', html + '</body>');
          css = '<style>' + css + '</style>';
          src = src.replace('</head>', css + JSflowroom + '</head>');
          js = '<script>' + js + '<\/script>';
          src = src.replace('</body>', js + '</body>');
          let dhtmlObj = {html:html, js:js, css:css}
         // alert(htmlObj.html);
          localStorage.setItem("dhtml", JSON.stringify(dhtmlObj));
          localStorage.setItem("css", JSON.stringify(css));
          localStorage.setItem("js", JSON.stringify(js));
          return src;
        };

        let renderDHTML = () => {
          // alert('called')
          let source = prepareSource();
          let iframe = document.querySelector('.output_frame');
          let iframe_doc = iframe.contentDocument;
                
          iframe_doc.open();
          iframe_doc.write(source);
          iframe_doc.close();
       
        if(this.state.libraries.length !== 0) {
            for(i = 0; i < this.state.libraries.length; i++) {
                var iFrameHead = iframe.contentWindow.document.getElementsByTagName("head")[0];
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
         
            
         
           

        }
        //when removing last library, set to [];
         
         
        };
  
        HTML_EDITOR = CodeMirror.fromTextArea(document.getElementById("html_code"), {
          lineNumbers: true,
          mode: "htmlmixed",
          theme: "dracula",
          lineWrapping: true
        });
  
        CSS_EDITOR = CodeMirror.fromTextArea(document.getElementById("css_code"), {
          lineNumbers: true,
          mode: "css",
          theme: "dracula",
          lineWrapping: true
        });
  
        JS_EDITOR = CodeMirror.fromTextArea(document.getElementById("js_code"), {
          lineNumbers: true,
          mode: "javascript",
          theme: "dracula",
          lineWrapping: true
        });
  
        renderDHTML();
       
        let typingTimer;                //timer identifier
        let doneTypingInterval = 1000;
       
      
      //user is "finished typing," do something
      
      
      function doneTyping () {
        renderDHTML();

        let html = HTML_EDITOR.getValue() || null;
        let css = CSS_EDITOR.getValue() || null;
        let js = JS_EDITOR.getValue() || null;
        that.props.saveDHTML({html, css, js});
     
      }

      let isHTMLREADY = false;
      let isCSSREADY = false;
      let isJSREADY= false;
  
      // window.updateJSCode = function(code) {
      //   JS_EDITOR.setValue(code)
      // }
       

        HTML_EDITOR.on('change', (inst, changes) => {
          let html = HTML_EDITOR.getValue() || null;
      let css = CSS_EDITOR.getValue() || null;
      let js = JS_EDITOR.getValue() || null;
          that.props.saveDHTML({html, css, js});
          if(!isHTMLREADY) {
            renderDHTML();
            
            isHTMLREADY = true;
          }
          
        });
        HTML_EDITOR.on('keyup', () => {
     
          clearTimeout(typingTimer);
          if (HTML_EDITOR.getValue()) {
              typingTimer = setTimeout(doneTyping, doneTypingInterval);
          }
        });
        CSS_EDITOR.on('change', function(inst, changes) {
          let html = HTML_EDITOR.getValue();
          let css = CSS_EDITOR.getValue();
          let js = JS_EDITOR.getValue();
          html = html === undefined || html === null ? '' : html;
          css = css === undefined || css === null ? '' : css; 
          js = js === undefined || js === null ? '' : js;
          that.props.saveDHTML({html, css, js});
          if(!isCSSREADY) {
            renderDHTML();
          
            isCSSREADY = true;
          }
          
          
        
        });
        CSS_EDITOR.on('keyup', () => {
          clearTimeout(typingTimer);
          if (CSS_EDITOR.getValue()) {
              typingTimer = setTimeout(doneTyping, doneTypingInterval);
          }
        });
        JS_EDITOR.on('change', function(inst, changes) {
          let html = HTML_EDITOR.getValue() || null;
          let css = CSS_EDITOR.getValue() || null;
          let js = JS_EDITOR.getValue() || null;
          that.props.saveDHTML({html, css, js});
          if(!isJSREADY) {
            renderDHTML();
            
            isJSREADY = true;
          }
          
        });

        JS_EDITOR.on('keyup', () => {
          clearTimeout(typingTimer);
          if ( JS_EDITOR.getValue()) {
              typingTimer = setTimeout(doneTyping, doneTypingInterval);
          }
        });
        

        

        
      
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



            //   if(poor !== '') {
            //     HTML_EDITOR.setValue(poor);
            //   }
           
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

    renderContent2(before = null, htmlUpdate = null, cssUpdate = null, jsUpdate = null) {
  

        if(before !== null) {
        
          let html = JSON.parse(localStorage.getItem("html"));
        // let css = JSON.parse(localStorage.getItem("css"));
        // let js = JSON.parse(localStorage.getItem("js"));
        
           console.log(htmlUpdate);
           let str = html.html;

           var res = str.replace(before.before, htmlUpdate);
            //console.log(before.before, '', htmlUpdate)
            HTML_EDITOR.setValue(res);
            
       }
        
    }
    editorDragStart() {
        document.getElementById('out-cover').style.display = 'block';
    }
    editorDragStop() {
        document.getElementById('out-cover').style.display = 'none';
        // this.setState({resizableHeight:0});
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
        
        let resizeHeight = document.getElementById('resizable-box').clientHeight;
        this.setState((prevState, props) => {
            return {
                resizeableCurrentHeight:resizeHeight,
                rotateTriangles:true
            }
        });
        if(resizeHeight > 20) {
            this.setState((prevState, props) => { return { rotateTriangles:-90 } });
        } else if(resizeHeight < 200) {
            this.setState((prevState, props) => { return { rotateTriangles: 0 } });
        } else if(this.state.showSubComponent === true && resizeHeight > 400) {
            this.setState((prevState, props) => { return { rotateTriangles:-90 } });
        } else if(resizeHeight < 400) {
            this.setState((prevState, props) => { return { rotateTriangles: 0 } });
        }
        
        let codeTriangle1 = document.getElementsByClassName('down-editor-3x')[0];
        let codeTriangle2 = document.getElementsByClassName('down-editor-3x')[1];
        let codeTriangle3 = document.getElementsByClassName('down-editor-3x')[2];

    }
    resizeAnimationComplete () {

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