
import React, { Component } from 'react';
import ReactDOM from 'react-dom'

//import PhotoEditorUI from 'photoeditorsdk/desktop-ui'
import PhotoEditorUI from 'photoeditorsdk/react-ui';
import Styles from 'photoeditorsdk/css/PhotoEditorSDK.UI.ReactUI.min.css';
import axios from 'axios';
console.log(React.version);

class PhotoEditor extends React.Component {
  constructor(props) {
    super(props)
    this.photoEditorSDK = React.createRef();
    this.state = {
      isDrawing:false,
      image:''
    }
  }
  componentDidMount(){
    this.bindExportEvent();
    this.resetEditor();

    this.waitForElementToDisplay('.pesdk-react-controls__list',100);
  }

  handleLoad() {

  }

  resetEditor(e,img){
    return this.photoEditorSDK.current.ui.setImage(img);
   
  }


base64Encode(str) {
    var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out = "", i = 0, len = str.length, c1, c2, c3;
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += CHARS.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += CHARS.charAt(c3 & 0x3F);
    }
    return out;
}
  removeBG() {
    axios.post(`https://api.remove.bg/v1.0/removebg`, {
      image_url: 'https://www.remove.bg/example.jpg',
      size: 'regular',
    },
    {headers: {
      'X-Api-Key': 'ZLgFThtZ8wNHWHyZKbHXdnZ4'
    }}
    )
    .then(res => {

      let img_base64_val = this.base64Encode(res.data);
      
      var reader = new FileReader();
      reader.onload = (function(self) {
        return function(e) {
          document.getElementById("img").src = e.target.result;
        }
      })
        reader.readAsDataURL(new Blob([res.data]));
      
      this.setState({image:img_base64_val});
      console.log(img_base64_val)
     
    })
  }
bindExportEvent(){
  
  this.photoEditorSDK.current.ui.on('export', (result) => {
      console.log('exported' + result);
      
      var iframe = document.getElementById("output_frame");
      if(this.props.type === 'id') {
        iframe.contentWindow.document.getElementById(`${this.props.classorid}`).style.backgroundImage = `url(${result})`;
      } else if (this.props.type === 'class') {
        for(let i = 0; i < iframe.contentWindow.document.getElementsByClassName(`${this.props.classorid}`).length; i++) {
          iframe.contentWindow.document.getElementsByClassName(`${this.props.classorid}`)[i].style.backgroundImage = `url(${result})`;

        }
      }
      

  });
 
}
waitForElementToDisplay(selector, time) {
  if(document.querySelector(selector)!= null) {
    let controls = document.getElementsByClassName('pesdk-react-controls__list')[0];
    let clear = document.createElement('li');
    clear.setAttribute("data-identifier", "filter");
    clear.className = 'pesdk-react-controls__list__item';
    let pesdk = document.createElement('div');
    pesdk.className = 'pesdk-react-controls__button pesdk-react-controls__button--withLabel';
    clear.appendChild(pesdk);
    let img = document.createElement('img');
    img.src = '../assets/ui/react/controls/overview/filters@2x.png';
    img.className ='pesdk-react-controls__button__icon'
    pesdk.appendChild(img);
    let pesdk_button = document.createElement('div');
    pesdk_button.className = 'pesdk-react-controls__button__label';
    let buttonText = document.createTextNode('Clear');
    pesdk_button.appendChild(buttonText);
    pesdk.appendChild(pesdk_button);
    controls.insertBefore(clear, controls.childNodes[1]);

    let remove = document.createElement('li');
    remove.setAttribute("data-identifier", "filter");
    remove.className = 'pesdk-react-controls__list__item';
    let pesdk_r = document.createElement('div');
    pesdk_r.className = 'pesdk-react-controls__button pesdk-react-controls__button--withLabel';
    remove.appendChild(pesdk_r);
    let imgr = document.createElement('img');
    imgr.src = '../assets/ui/react/controls/overview/filters@2x.png';
    imgr.className ='pesdk-react-controls__button__icon'
    pesdk_r.appendChild(imgr);
    let pesdk_button_r = document.createElement('div');
    pesdk_button_r.className = 'pesdk-react-controls__button__label';
    let buttonText_r = document.createTextNode('Remove BG');
    pesdk_button_r.appendChild(buttonText_r);
    pesdk_r.appendChild(pesdk_button_r);
    controls.insertBefore(remove, controls.childNodes[1]);

    let erase = document.createElement('li');
    erase.setAttribute("data-identifier", "filter");
    erase.className = 'pesdk-react-controls__list__item';
    let pesdk_e = document.createElement('div');
    pesdk_e.className = 'pesdk-react-controls__button pesdk-react-controls__button--withLabel';
    erase.appendChild(pesdk_e);
    let imge = document.createElement('img');
    imge.src = '../assets/ui/react/controls/overview/filters@2x.png';
    imge.className ='pesdk-react-controls__button__icon'
    pesdk_e.appendChild(imge);
    let pesdk_button_e = document.createElement('div');
    pesdk_button_e.className = 'pesdk-react-controls__button__label';
    let buttonText_e = document.createTextNode('Eraser');
    pesdk_button_e.appendChild(buttonText_e);
    pesdk_e.appendChild(pesdk_button_e);
    controls.insertBefore(erase, controls.childNodes[1]);

    erase.addEventListener('click', ()=> {
      console.log('DOM content loaded')
      let canvas = document.getElementsByClassName('pesdk-react-canvas__canvas')[0];
      let overlayCanvas = document.createElement('canvas');
      let canvasWrap = document.getElementsByClassName('pesdk-react-canvas__innerContainer')[0];
      
      overlayCanvas.setAttribute("id","overlay");

      overlayCanvas.setAttribute("height",`${canvas.height}`);
      overlayCanvas.setAttribute("width",`${canvas.width}`);
      
      overlayCanvas.setAttribute("style", "position:absolute;");
      overlayCanvas.setAttribute("style", "background-color:#181818;");
      overlayCanvas.className = 'pesdk-react-canvas__canvas';

      canvasWrap.appendChild(overlayCanvas);
      const ctx = canvas.getContext('2d');
      const over_ctx = overlayCanvas.getContext('2d');
      

      const image = new Image();
    // canvasDup.className = "pesdk-react-canvas__canvas";

    image.onload = function() {
      
      over_ctx.drawImage(image, 0,0);
    }
    image.src = canvas.toDataURL();
 
   // define a custom fillCircle method
   over_ctx.fillCircle = function(x, y, radius, fillColor) {
       this.fillStyle = fillColor;
       this.beginPath();
       this.moveTo(x, y);
       this.arc(x, y, radius, 0, Math.PI * 2, false);
       this.fill();
   };
  //  ctx.clearTo = function(fillColor) {
  //      ctx.fillStyle = fillColor;
  //      ctx.fillRect(0, 0, canvas.width, canvas.height);
  //  };
   //ctx.clearTo("#ddd");

   // bind mouse events
  
   overlayCanvas.onmousemove = function(e) {
   
       if (!overlayCanvas.isDrawing) {
          return;
       }
       var x = e.pageX - this.offsetLeft;
       var y = e.pageY - this.offsetTop;
       console.log(x, y);
       var radius = 10; // or whatever
       var fillColor = '#ff0000';
       over_ctx.globalCompositeOperation = 'destination-out';
       over_ctx.fillCircle(x, y, radius, fillColor);
   };
   console.log(overlayCanvas.onmousemove)
   overlayCanvas.onmousedown = function(e) {
    overlayCanvas.isDrawing = true;

   };
   overlayCanvas.onmouseup = function(e) {
    overlayCanvas.isDrawing = false;

   }
   let controls = document.getElementsByClassName('pesdk-react-controls')[0];
   let controltable = document.createElement('div');
   let controlButton = document.createElement('div');
   controltable.className = 'pesdk-react-controls__table';
  
   controlButton.className = 'pesdk-react-controls__cell pesdk-react-controls__cell--largeButton';
   let controlLargeButton = document.createElement('div');
   controlLargeButton.className = 'pesdk-react-controls__largeButton'; 
   controlButton.appendChild(controlLargeButton);
   controltable.appendChild(controlButton);
   let img = document.createElement('img');
   img.src = '../assets/ui/react/controls/back@2x.png';
   controltable.appendChild(img);
   controls.style.position = 'absolute';
   controls.appendChild(controltable)
   

    })

      return;
  }
  else {
      setTimeout(()=> {
          this.waitForElementToDisplay(selector, time);
      }, time);
  }
}
  render () {
    let image = new Image();
    image.src = this.props.image;
    

    return (<div style={{height:'100%',width:'100%'}}><PhotoEditorUI.ReactComponent
      ref={this.photoEditorSDK}
      
      crossOrigin={'anonymous'}
      license='{"owner":"Brandon Spellman","version":"2.1","enterprise_license":false,"available_actions":["magic","filter","transform","sticker","text","adjustments","brush","focus","frames","camera"],"features":["adjustment","filter","focus","overlay","transform","text","sticker","frame","brush","camera","textdesign","library","export"],"platform":"HTML5","app_identifiers":["localhost","flowroom.com"],"api_token":"UdnhTwaV6pXyTwR70rftKQ","domains":["https://api.photoeditorsdk.com"],"issued_at":1550134237,"expires_at":1552694400,"signature":"HCD8Nuh9AfRSrritmdao0aahQMXfoUqw4rKHtoqOIN2Tei7f5M4PeaYjfmC1ItzjU6IE3yYLWoeIxz4nrL8xtNAnhbIuIOsFdunOA58YzjnWBAEs0psdUfA66O28opMF7rCjqtWrgZ3aV56l2xxB0M2M0ewXF/pyGVeRqySROQLZkN9RV3unIkkEzmxIjaLiiShLHJLmLMqO6cZyJLrRPqEDgd9w2hzQWQ5zcBUBTC+4mXxvelqd/3z0VL9sD5s6wjCW+unyi6t2Lqx873xDmwkphnuuZLatZrnGBD81E0J/xo8Jqm620UDo5tUo8PsT23GcQ/JLzIcikL3KO8WC5hZO8w/iTZ53edzsg2U2vO2bSKS2PKtLqkDjjDjc94ydAZwat5LuVy/MP+zg9R2LSEuRfiFhnDGpRj0cgdjQlXMyZaWxnp58VcfE3XEcQIX/u2VdtXjFQMht9nBdQcb3Dr8GVVu6uwweumaIFq5a1/VQKs043I0Haqzxsgff02M92v89x7hfdCZ6JEgLJMnFdhUPBi6dGWCtqYUrmgGHDghrL6vXlxUaVvSMOs6e01+kQZLUlpMZ99SUFaRV/ECnraAzwSpZNtMzP0WCaCCCAq/DoIN9MDv9WMDDOWHVeAcrETFWJCLpTJwVkDqi89Eyy2fjvNlba+Ik1/wog9qjKlA="}'
      assets={{
        baseUrl: '../assets'
      }}
      
      responsive={true}
      editor={{
        preferredRenderer:'canvas',
        image: image,
        export: {
          format: 'image/png',
          type: 'data-url',
          download: false,
        },
        responsive:true
      }}
      style={{
       
        height: '100%'
      }} 
      
   
      /><button id="clear" onClick={()=>{
          
        let canvas = document.getElementsByClassName('pesdk-react-canvas__canvas')[0];
            const context = canvas.getContext('2d');
            // Store the current transformation matrix
          context.save();

          // Use the identity matrix while clearing the canvas
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Restore the transform
        context.restore();
            
            
      }}>clear</button>
      <button id="eraser" onClick={()=> {

         
  
      }}>eraser</button><button onClick={(e)=>{
        let canvas = document.getElementsByClassName('pesdk-react-canvas__canvas')[0];
        let canvasDup = document.getElementById('overlay');
        canvasDup.style.display = 'none'
        let image = new Image();
        
        
          this.resetEditor(e, image);
        
        image.src = canvasDup.toDataURL();
        //alert(canvasDup.toDataURL())
      }}>save</button><button onClick={this.removeBG.bind(this)}>Remove BG</button><img id="img" src={`data:image/png;base64,${this.state.image}`} /></div>)
  }
}


export default PhotoEditor;