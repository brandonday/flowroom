import React, { Component } from 'react';
import Overlay from './overlay.js'

 class Flow extends Component {  
     constructor(){
         super();
         this.state = {

                isRemixable:false,
      
                
         }
     }
     componentDidMount() {
    
        let base_tpl = "<!doctype html>\n" +
        "<html>\n\t" +
        "<head>\n\t\t" +
        "<meta charset=\"utf-8\">\n\t\t" +
        "<title>Test</title>\n\n\t\t\n\t" +
        "</head>\n\t" +
        "<body>\n\t\n\t" +
        "</body>\n" +
        "</html>";

        let resize = `
        .rotate {content: "";
    position: absolute;
    top: 16px;
    left: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' hei… 0 2.18 15.57.75.75 0 0 0 .47-1.43 7.25 7.25 0 0 1-1-13.37z'/%3E%3C/svg%3E) 2px 2px no-repeat;
    background-size: 16px 16px;
    box-shadow: 0 0 5px 1px rgba(14,19,24,.15), 0 0 0 1px rgba(14,19,24,.15);}
    .resizable {
      background: white;
      width: 100px;
      height: 100px;
      position: absolute;
      top: 100px;
      left: 100px;
      border: 1px solid hsla(0,0%,50%,.2) !important;
    }
    
    .resizable .resizers{
      width: 100%;
      height: 100%;
   
      box-sizing: border-box;
    }
    
    .resizable .resizers .resizer{
      width: 10px;
      height: 10px;
      border-radius: 50%; /*magic to turn square into circle*/
      background: white;
      position: absolute;
    }
    
    .resizable .resizers .resizer.top-left {
      left: -5px;
      top: -5px;
      cursor: nwse-resize; /*resizer cursor*/
    }
    .resizable .resizers .resizer.top-right {
      right: -5px;
      top: -5px;
      cursor: nesw-resize;
    }
    .resizable .resizers .resizer.bottom-left {
      left: -5px;
      bottom: -5px;
      cursor: nesw-resize;
    }
    .resizable .resizers .resizer.bottom-right {
      right: -5px;
      bottom: -5px;
      cursor: nwse-resize;
    }
        `
let subj = '<script src="../dist/js/subjx.js"></script>';
let subjcss = '<link rel="stylesheet" href="../dist/style/subjx.css">';        
let drag = `<script></script>`
let fontawesome = '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"></link> '    
     
        let prepareSource = () => {
          let html = '<div id="overlay-container" style="position:absolute;top:0px;left:0px;bottom:0px;height:100%;width:100%"></div>';
          let css = '';
          let js = '';
         

          let JSflowroom = '<script src="../flowroom.js"></script>';
          let src = '';
          src = base_tpl.replace('</body>', '</body>');
          css = '<style>' + css + resize + '</style>';
          src = src.replace('</head>', css + JSflowroom + fontawesome + subjcss + '</head>');
          js = '<script>' + js + '<\/script>';
          src = src.replace('</body>', js + subj + drag + html +'</body>');
         
          
         // alert(htmlObj.html);
          
          // localStorage.setItem("css", JSON.stringify(css));
          // localStorage.setItem("js", JSON.stringify(js));
          return src;
        };

        let renderDHTML = () => {
          // alert('called')
          let source = prepareSource();
          let iframe = document.querySelector('.overlay_output_frame');
          let iframe_doc = iframe.contentDocument;
                
          iframe_doc.open();
          iframe_doc.write(source);
          iframe_doc.close();

        //when removing last library, set to [];
         
         
        };
  
       
  
        renderDHTML();
       

     }

     render() {
        return (
            <div style={{height:'100%', width:'100%'}}>
                  <div id="full_wrap" style={{height:'100%',width:'100%',border:'none',background:'transparent'}}> 
                            <iframe id="output_frame" className="output_frame" src={`/full/${this.props.shortID}`} style={{position:'relative',display:'block'}}></iframe>
                            <iframe id="overlay_output_frame" className="overlay_output_frame" src="" style={{position:'absolute',display:'block',background:'red',top:11,height:460,width:330,background:'transparent'}}></iframe>
                         
                        </div>
            </div>
        )
     }
 }
export default Flow;


