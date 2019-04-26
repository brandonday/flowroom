
import React, { Component } from 'react';
import ReactDOM from 'react-dom'

//import PhotoEditorUI from 'photoeditorsdk/desktop-ui'
import PhotoEditorUI from 'photoeditorsdk/react-ui';
import Styles from 'photoeditorsdk/css/PhotoEditorSDK.UI.ReactUI.min.css';
import axios from 'axios';
import AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import uuid from 'uuid';
import Hashids from 'hashids';

AWS.config.update({
  region: 'us-west-2',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:5df2511a-5595-416c-b148-aba28893c3f3'
  })
});

const s3 = new S3();



class PhotoEditor extends React.Component {
  constructor(props) {
    super(props)
    this.photoEditorSDK = React.createRef();
    this.state = {
      isDrawing:false,
      image:this.props.image,
      knob:23.6294,
      id:this.props.id
    }
  }
  componentDidMount() {
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
    {
      headers: {
        'X-Api-Key': 'ZLgFThtZ8wNHWHyZKbHXdnZ4'
      }
    }).then(res => {
    let img_base64_val = this.base64Encode(res.data);
    var reader = new FileReader();
    reader.onload = (function(self) {
      return function(e) {
        document.getElementById("img").src = e.target.result;
        }
      });
      reader.readAsDataURL(new Blob([res.data]));
      this.setState({image:img_base64_val});
      console.log(img_base64_val)
    });
  }
  recreateList() {
  // document.getElementsByClassName('remix-m')[0].style.display = 'none';  

    function removeDuplicates(originalArray, prop) {
      var newArray = [];
      var lookupObject  = {};
      for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
      }
      for(i in lookupObject) {
        newArray.push(lookupObject[i]);
      }
      return newArray;
    }
  
 

    let that = this;
    let list = document.getElementById('main-menu');
    let getList = JSON.parse(localStorage.getItem( "FR_REMIX_LIST"));
    let remixList = document.createElement('div');
    remixList.setAttribute("id", "remix-list");
    remixList.style.display = 'flex';
    remixList.style.flexDirection = 'column';
    remixList.style.width = '100%';
    // remixList.style.flexDirection = 'row';
    // remixList.style.flexWrap = 'wrap';

    if(getList != null) {
    let overlay = document.createElement('div');
        overlay.setAttribute("id","remix-overlay");
    let uniqueArray;
      for(let i = 0; i < getList.length; i++) {
        let n = Object.getOwnPropertyNames(getList[i]);
        let final = n[0];
          uniqueArray = removeDuplicates(getList, final);
      }
              
      console.log(uniqueArray)
      this.setState({currentpic:uniqueArray[0]});
              
      for(let j = 0; j < uniqueArray.length; j++) {
        let item = document.createElement('li');
        let bgImg = document.createElement('div');
                            
        bgImg.style.backgroundImage = `url(${getList[j].image})`;
              bgImg.style.height = '50px';
              bgImg.style.width = '50px';
              bgImg.style.backgroundSize = 'cover';
     
              item.style.height = '100px';
              item.style.width = '100px';

              item.style.marginTop = '10px';
              item.style.marginBottom = '10px';

              item.style.marginLeft = '10px';
              item.style.marginRight = '10px';

              item.style.border = '1px solid #DDE0EB';
              item.style.display = 'flex';
              item.style.alignItems = 'center';
              item.style.borderRadius = '0px';

              bgImg.style.marginRight = '5px';
              bgImg.style.marginLeft = '7px';
              bgImg.style.position = 'relative';
              item.style.display = 'flex';
              item.style.justifyContent = 'center';
              bgImg.style.right = '0px';
              item.appendChild(bgImg);
              
              remixList.appendChild(item);
          
        
              if(getList[j].type === 'url') {
                item.addEventListener('click', ()=> {

                  
                  
                  let img = new Image;
                  img.setAttribute('crossOrigin', 'anonymous'); 
                  
                  let canvas = document.createElement('canvas');
                  let ctx = canvas.getContext("2d");
                  
              
                  img.onload = function() {
                 
                  canvas.width = img.width;
                  canvas.height = img.height;
                  ctx.drawImage( img, 0, 0 );
                  localStorage.setItem( `savedImageData${j}`, canvas.toDataURL("image/png") );
                  let getImageSaved = localStorage.getItem(`savedImageData${j}`);
                  //alert(getImageSaved);
                  document.getElementById('menu-wrap').style.display = 'block';
                  document.getElementById('menu').style.display = '583px';
                  document.getElementById('menu').style.display = 'block';
                  let backArrow = document.createElement('i');
                  backArrow.className = 'far fa-caret-square-left';
                  backArrow.style.height = '20px';
                  backArrow.style.width = '20px';
                  let menuTitle = document.createElement('p');
                  let menuText = document.createTextNode('REMIXABLE ITEMS');
                  menuTitle.appendChild(menuText);
                  let close = document.createElement('i');
                  close.className = 'far fa-caret-square-left';
                  close.style.height = '20px';
                  close.style.width = '20px';
            
                  that.setState({pic:getImageSaved, id:getList[j].id,classorid:'class', type:getList[j].type})

                  document.getElementById('menu-wrap').style.height = '583px';
                   
                  
                  let image = new Image();
                  image.src = getImageSaved;
                  that.resetEditor(null, image);
                  
                  //testFR(elId);
                  }
                  
                
                  img.src = getList[j].image;
              
                  

                  
              })

              } else {

              item.addEventListener('click', ()=> {
                  
                  let img = new Image;
                  img.setAttribute('crossOrigin', 'anonymous'); 
                  
                  let canvas = document.createElement('canvas');
                  let ctx = canvas.getContext("2d");
                  
              
                  img.onload = function() {
                 
                  canvas.width = img.width;
                  canvas.height = img.height;
                  ctx.drawImage( img, 0, 0 );
                  localStorage.setItem( `savedImageData${j}`, canvas.toDataURL("image/png") );
                  let getImageSaved = localStorage.getItem(`savedImageData${j}`);
                  //alert(getImageSaved);
                  document.getElementById('menu-wrap').style.display = 'block';
                  document.getElementById('menu').style.display = 'block';
                  that.setState({pic:getImageSaved,id:getList[j].id, classorid:getList[j].classorid, type:getList[j].type})

              
                  let image = new Image();
                  image.src = getImageSaved;
                  that.resetEditor(null, image);
                  
                  //testFR(elId);
                  }
                  img.src = getList[j].image;
              
                  

                  
              })

              }
              
            }
            list.appendChild(remixList);
          }

}
async putObject(id, image) {
  // const data = await s3.putObject({
  //     Bucket: 'test.flowroom.com',
  //     Key:'uploads/' + fileName,
  //     ContentType: 'image/png',
  //     Body: image
  // }).promise();
  // console.log('s3 data: ',data);
  let hashids = new Hashids(uuid(), 6);
  let fileName = hashids.encode(1, 2, 3) + '.png';
  
  let buffer = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""),'base64')

  let params = { 
      Bucket: 'test.flowroom.com',
      Key:'uploads/' + fileName,
      ContentEncoding: 'base64',
      ContentType: 'image/png',
      Body: buffer,
      
    }

  
  let that = this;
  s3.putObject(params, function(err, data) {
    console.log('err: ', err)
    if (err) {
      console.log('error :',err);
    } else {
      console.log('data :', data);
      let obj = {
        id:id,
        url:`http://test.flowroom.com/uploads/${fileName}`
      }
      console.log('obj :', obj);
      let iframe = document.getElementById("output_frame");
      iframe.contentWindow.remixCallback(obj);

      let json = localStorage.getItem("FR_REMIX_LIST");
      
      let listObj = JSON.parse(json);
     
      for(let i = 0; i < listObj.length; i++) {
        if(listObj[i].id == id) {
          listObj[i].image = obj.url;
          break;
        } 
              
      }
      localStorage.setItem("FR_REMIX_LIST", JSON.stringify(listObj));
      let remixList = document.getElementById('remix-list');
      remixList.parentNode.removeChild(remixList);
      document.getElementById('menu-wrap').style.display = 'none';
      
      that.recreateList();
      localStorage.setItem("newPost", false); /*if it's being remixed, this is changed to false. It's not a new post*/
    }
  });
}

bindExportEvent() {
  
  this.photoEditorSDK.current.ui.on('export', (result) => {

    // console.log('exported' + result);
    var iframe = document.getElementById("output_frame");
    if(this.props.type === 'id') {
      
      let element = iframe.contentWindow.document.getElementById(this.props.classorid);
      if(element.tagName.toLowerCase() == 'img') {
        element.src = result;
      } else {
        iframe.contentWindow.document.getElementById(`${this.props.classorid}`).style.backgroundImage = `url(${result})`;
      }
     
    } else if (this.props.type === 'class') {
      let element = iframe.contentWindow.document.getElementsByClassName(this.props.classorid);
      if(element[0].tagName.toLowerCase() == 'img') {
        for(let i = 0; i < iframe.contentWindow.document.getElementsByClassName(`${this.props.classorid}`).length; i++) {
          element[i].src = result;
        }
      } else {for(let i = 0; i < iframe.contentWindow.document.getElementsByClassName(`${this.props.classorid}`).length; i++) {
        iframe.contentWindow.document.getElementsByClassName(`${this.props.classorid}`)[i].style.backgroundImage = `url(${result})`;
      }
    }
    } else {
   
      
      this.putObject(this.state.id, result);
      
     
    }
  });

}

waitForElementToDisplay(selector, time) {
  let that = this;
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
      ctx.clearTo = function(fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };
      ctx.clearTo("#ddd");

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
      let controls = document.getElementsByClassName('pesdk-react-controls')[1];
      console.log(controls)
      let controltable = document.createElement('div');
      controltable.className = 'pesdk-react-controls__table';
      controltable.style.backgroundColor = '#181818';
      let img = document.createElement('img');
      img.className = 'pesdk-react-controls__largeButton__icon';
      img.src = '../assets/ui/react/controls/back@2x.png';
      controltable.appendChild(img);
      
      
      let controlButton = document.createElement('div');
      controlButton.className = 'pesdk-react-controls__cell pesdk-react-controls__cell--largeButton';
      let controlLargeButton = document.createElement('div');
      controlLargeButton.className = 'pesdk-react-controls__largeButton'; 
      controlLargeButton.appendChild(img);
      controlButton.appendChild(controlLargeButton);
      controlButton.addEventListener('click', ()=> {
        let canvas = document.getElementsByClassName('pesdk-react-canvas__canvas')[0];
        let canvasDup = document.getElementById('overlay');
        canvasDup.style.display = 'none'
        let image = new Image();
        image.src = canvasDup.toDataURL();
        this.resetEditor(null, image);
        controltable.style.display = 'none';
        document.getElementsByClassName('pesdk-react-controls__largeButton')[0].addEventListener('click', ()=>{
          alert('hhhj')
          this.waitForElementToDisplay('.pesdk-react-controls__list',100);
        })
      });
      let slider_wrap = document.createElement('div');
      let slider = document.createElement('div');
      slider.className = 'pesdk-react-slider pesdk-react-slider--large';
      let slider_bar = document.createElement('div');
      slider_bar.className = 'pesdk-react-slider__bar';
      let slider_labels = document.createElement('div');
      let slider_label_ = document.createElement('div');
      let slider_label_2 = document.createElement('div');
      let slider_label_3 = document.createElement('div');
      slider_labels.className = 'pesdk-react-slider__labels';
      slider_label_.className = 'pesdk-react-slider__labels__label pesdk-react-slider__labels__label--lowerBoundary';
      slider_label_.appendChild(document.createTextNode('1px'));
      slider_label_2.className = 'pesdk-react-slider__labels__label pesdk-react-slider__labels__label--value';
      slider_label_2.appendChild(document.createTextNode('Size'));
      slider_label_2.appendChild(document.createTextNode('20px'));
      slider_label_3.className = 'pesdk-react-slider__labels__label pesdk-react-slider__labels__label--upperBoundary';
      slider_label_3.appendChild(document.createTextNode('198px'));
      let div = document.createElement('div');
      let slider_bg = document.createElement('div');
      slider_labels.appendChild(slider_label_);
      slider_labels.appendChild(slider_label_2);
      slider_labels.appendChild(slider_label_3);
      let slider_foreground = document.createElement('div');
      let slider_knob = document.createElement('input');
      slider_knob.type = 'range';
      slider_knob.min = '1';
      slider_knob.max = "100";
      slider_knob.value = "0";
      slider_knob.style.width = '90%';

      //slider_knob.style.position = 'relative';
      //slider_knob.style.left = `${that.state.knob}px`;
 

 

      // slider_wrap.className = 'pesdk-react-controls__cell pesdk-react-controls__cell--slider';
      
      slider_knob.addEventListener('drag',()=>{
        
      },false)
     
      div.appendChild(slider_bg);
      div.appendChild(slider_foreground);
      div.appendChild(slider_knob);
      
      slider_bar.appendChild(div);

      
      slider.appendChild(slider_bar);
      slider.appendChild(slider_labels);
      controltable.appendChild(controlButton);
      slider_wrap.appendChild(slider);
      
      controltable.appendChild(slider_wrap);
        //  controls.style.position = 'absolute';
      controls.appendChild(controltable);
    });
    return;
  }
  else {
      setTimeout(()=> {
          this.waitForElementToDisplay(selector, time);
      }, time);
  }
}
render() {
  let image = new Image();
  image.src = this.state.image;
  return (
    <div style={{height:'100%',width:'100%'}}>
      <PhotoEditorUI.ReactComponent
        ref={this.photoEditorSDK}
        crossOrigin={'anonymous'}
        // license='{"owner":"Brandon Spellman","version":"2.1","enterprise_license":false,"available_actions":["magic","filter","transform","sticker","text","adjustments","brush","focus","frames","camera"],"features":["adjustment","filter","focus","overlay","transform","text","sticker","frame","brush","camera","textdesign","library","export"],"platform":"HTML5","app_identifiers":["localhost","test.flowroom.com"],"api_token":"UdnhTwaV6pXyTwR70rftKQ","domains":["https://api.photoeditorsdk.com"],"issued_at":1550134237,"expires_at":1552694400,"signature":"HCD8Nuh9AfRSrritmdao0aahQMXfoUqw4rKHtoqOIN2Tei7f5M4PeaYjfmC1ItzjU6IE3yYLWoeIxz4nrL8xtNAnhbIuIOsFdunOA58YzjnWBAEs0psdUfA66O28opMF7rCjqtWrgZ3aV56l2xxB0M2M0ewXF/pyGVeRqySROQLZkN9RV3unIkkEzmxIjaLiiShLHJLmLMqO6cZyJLrRPqEDgd9w2hzQWQ5zcBUBTC+4mXxvelqd/3z0VL9sD5s6wjCW+unyi6t2Lqx873xDmwkphnuuZLatZrnGBD81E0J/xo8Jqm620UDo5tUo8PsT23GcQ/JLzIcikL3KO8WC5hZO8w/iTZ53edzsg2U2vO2bSKS2PKtLqkDjjDjc94ydAZwat5LuVy/MP+zg9R2LSEuRfiFhnDGpRj0cgdjQlXMyZaWxnp58VcfE3XEcQIX/u2VdtXjFQMht9nBdQcb3Dr8GVVu6uwweumaIFq5a1/VQKs043I0Haqzxsgff02M92v89x7hfdCZ6JEgLJMnFdhUPBi6dGWCtqYUrmgGHDghrL6vXlxUaVvSMOs6e01+kQZLUlpMZ99SUFaRV/ECnraAzwSpZNtMzP0WCaCCCAq/DoIN9MDv9WMDDOWHVeAcrETFWJCLpTJwVkDqi89Eyy2fjvNlba+Ik1/wog9qjKlA="}'
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
        }}/>
        {/* <button id="clear" onClick={()=> {
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
        <button id="eraser">eraser</button>
        <button>save</button>
        <button onClick={this.removeBG.bind(this)}>Remove BG</button>
        <img id="img" src={`data:image/png;base64,${this.state.image}`}/> */}
    </div>
    )
  }
}


export default PhotoEditor;