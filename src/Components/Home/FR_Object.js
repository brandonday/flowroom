import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Draggable from 'react-draggable';
import { firebase } from '.././firebase/firebase';
import { Resizable, ResizableBox } from 'react-resizable';

class FR_OBJECT extends Component {
    constructor() {
        super(); 
        this.state = {
            height:100,
            width:100,
            draggableDisabled:false,
            isResizing:false
        }
    }
    componentDidMount() {
        let base_tpl = "<!doctype html>\n" +
          "<html>\n\t" +
          "<head>\n\t\t" +
          "<meta charset=\"utf-8\">\n\t\t" +
          "<title>Test</title>\n\n\t\t\n\t" +
          "</head>\n\t" +
          "<body class='preview'>\n\t\n\t" +
          "</body>\n" +
          "</html>";
          let ref = firebase.database().ref("rooms").child('d8U0SR');
          ref.once("value").then((snapshot) => {    
            let prepareSource = () => {
              let html, css, js, src;
              if(snapshot.val() !== null) {
                html =  snapshot.val().html;
                css = snapshot.val().css;
                js = snapshot.val().js;
              } else {
                html = '';
                css = '';
                js = '';
              }
              src = '';
              src = base_tpl.replace('</body>', html + '</body>');
              css = '<style>' + css + '</style>';
              src = src.replace('</head>', css + '</head>');
              js = '<script>' + js + '<\/script>';
              src = src.replace('</body>', js + '</body>');
              return src;
            };
            let source = prepareSource();
            var objectIframe = document.getElementById('objContent');
            objectIframe = objectIframe.contentWindow || objectIframe.contentDocument.document || objectIframe.contentDocument;
            objectIframe.document.open();
            objectIframe.document.write(source);
            objectIframe.document.close();
          });
        } 
    onResize = (event, {element, size}) => {
        this.setState({draggableDisabled:true});
        this.setState({isResizing:true});
        this.setState({width:size.width, height:size.height});  
    } 
    onResizeStop = () => {
        this.setState({draggableDisabled:false});
        this.setState({isResizing:false});
    }
    onDragStop = () => {
        this.setState({draggableDisabled:true});
    }
    onDragStart = () => {
        this.setState({draggableDisabled:false});
    }
    render() {
        const dragHandlers = { onStart:this.onStart, onStop:this.onStop }
        return ( 
            <Draggable handle='strong' {...dragHandlers}>
            <Resizable  
                height={this.state.height} 
                width={this.state.width} 
                onResize={this.onResize} 
                onResizeStop={this.onResizeStop} 
                className="resizable-object-wrap"
                >  
                    <div id="draggable-box" className="draggable-box" 
                        style={{
                            width: this.state.width +'px', 
                            height:this.state.height + 'px'
                        }}>
                            <strong  className='strong menuBar'>
                                <div className="menu-options-wrap">
                                        <div className="menu-options-close"></div>
                                        <div className="menu-options-min"></div>
                                        <div className="menu-options-max"></div>
                                </div>
                            </strong>
                            <div className="object-content-wrap">
                                <iframe id="objContent" 
                                className="object-content" 
                                sandbox={"allow-same-origin allow-scripts allow-popups allow-forms"} 
                                security="restricted"/>
                            </div>

                            <div className="object-footer"></div>
                        </div>
   
                    </Resizable>
                </Draggable>
         )
    }
    
}



    


export default FR_OBJECT;