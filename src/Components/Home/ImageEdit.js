import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import {Link} from 'react-router-dom';

import PhotoEditor from './PhotoEditor.js';

// import { Darkroom, Canvas, History, Toolbar, FilePicker, CropMenu } from 'react-darkroom';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

// var ImageEditor = require('tui-image-editor');
// var whiteTheme = require('./white-theme.js');
let that;


 class ImageEdit extends Component {
    constructor() {
        super();
        this.state = {
            currentpic:'../public/batcat.png',
            pic:'',
            classorid:'',
            type:'',
            id:''
        }
    }
    componentDidMount() {
        document.getElementsByClassName('remix-m')[0].style.display = 'none';  
        // var innerWindow = document.getElementsByClassName('output_frame')[0].contentWindow;
        // innerWindow.testFR= this.testFR; 
        // that = this;

        // setTimeout(function() {
        //     var list = document.getElementsByClassName("pesdk-react-controls__list")[0];
        //     var node = document.createElement('li');
        //     node.setAttribute("data-identifier", "filter");
        //     node.className = 'pesdk-react-controls__list__item';
        //     let div = document.createElement('div');
        //     div.className = 'pesdk-react-controls__button pesdk-react-controls__button--withLabel';
        //     let img = document.createElement('img');
        //     img.src = '../assets/ui/react/controls/overview/filters@2x.png';
        //     img.className = 'pesdk-react-controls__button__icon';
        //     let button = document.createElement('div');
        //     button.className = 'pesdk-react-controls__button__label';
        //     let btntext = document.createTextNode('Filters');
        //     button.appendChild(btntext);
        //     div.appendChild(img);
        //     div.appendChild(button);
        //     node.appendChild(div);
         
        
           
        //     list.insertBefore(node, list.childNodes[1]);
        //     list.addEventListener('click', ()=>{
        //       let canvas = document.getElementsByTagName('pesdk-react-canvas__canvas')[0];
        //       const context = canvas.getContext('2d');
          
        //   context.clearRect(0, 0, canvas.width, canvas.height);
        //     })
        //     },10000)
  

      //console.log(this.state.currentpic)
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
        if(getList != null) {
        let overlay = document.createElement('div');
                    overlay.setAttribute("id","remix-overlay");
                    //let item;
                   
                   
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
                    
                   
                    list.appendChild(item);
              
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
                        that.setState({pic:getImageSaved,classorid:getList[j].classorid, type:getList[j].type})

                        
                        
                        //testFR(elId);
                        }
                        img.src = getList[j].image;
                    
                        

                        
                    })

                    }

                  }
                   
                }
                    //let secondCreated = false;
                //     item.addEventListener('click', function() {
                      
                //         var img = new Image,
                //         canvas = document.createElement("canvas"),
                //         ctx = canvas.getContext("2d"),
                //         src = bi; // insert image url here
                    
                //     img.crossOrigin = "Anonymous";
                    
                //    img.onload = function() {
                //         canvas.width = img.width;
                //         canvas.height = img.height;
                //         ctx.drawImage( img, 0, 0 );
                //         localStorage.setItem( "savedImageData", canvas.toDataURL("image/png") );
                //         //testFR(elId);
                //     }
                //     img.src = src;
                   
                //     //make sure the load event fires for cached images too
                //     if ( img.complete || img.complete === undefined ) {
                //         img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                //         img.src = bi;
                //     }

                           
                //             return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
                         
                          
                //           var base64 = getBase64Image(bi);
                //           alert(base64)
                        
                     


                //           var blob = null;
                //           var xhr = new XMLHttpRequest(); 
                //           xhr.open("GET", bi); 
                //           xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
                //           xhr.onload = function() 
                //           {
                //               blob = xhr.response;//xhr.response is now a blob object
                              
                //           }
                //           xhr.send();
                //           var myReader = new FileReader();
                //   myReader.readAsArrayBuffer(blob)
                //   myReader.addEventListener("loadend", function(e)
                //   {
                //           var buffer = e.srcElement.result;//arraybuffer object
                //           //that.setState({ src: buffer})
                //   });

                
                  
                //   var base64 = getBase64Image('https://i.pinimg.com/originals/69/64/4d/69644d2af4e6bf16fcf88a9ac1b275d6.jpg');

                //           alert(base64)
                //           testFR(base64);
                //         window.top
                //         alert(classorid);
                //         if(secondCreated === false) {
                        
                //         overlay.style.position = 'absolute';
                //         overlay.style.zIndex = '1';
                //         overlay.style.height = '100%';
                //         overlay.style.width = '100%';
                //         overlay.style.backgroundColor = 'white';
                //         overlay.style.visibility = 'visible';
    
                //         overlay.style.alignItems = 'center';
                //         overlay.style.display = 'flex';
                //         overlay.style.flexDirection = 'column';
    
                //         let oside = parent.document.getElementById('main-menu');
                        
                //         oside.appendChild(overlay);
                     
                //         let head = document.createElement('div');
                //         let headText = document.createElement('p');
                //         let iconContainer = document.createElement('div');
                //         let descriptionText = document.createElement('p');
                //         let saveBTN = document.createElement('div');
                //         saveBTN.style.height = '30px';
                //         saveBTN.style.width = '150px';
                //         saveBTN.style.border = '1px solid black';
                //         saveBTN.style.borderRadius = '6px';
                //         saveBTN.style.marginTop = '10px';
                //         saveBTN.appendChild(document.createTextNode('SAVE'));
                //         saveBTN.style.display = 'flex';
                //         saveBTN.style.justifyContent = 'center';
                //         saveBTN.style.alignItems = 'center';
                //         saveBTN.addEventListener('click', ()=> {
                //             let beforeT;
                //             if(tagType === 'textarea') {
                //              beforeT = document.getElementById(classorid).value;
                //             } else if(tagType === 'input') { 
                //              beforeT = document.getElementById(classorid).value;
                //             } else {
                //              beforeT = document.getElementById(classorid).innerText;
                //             }
            
                //             if(tagType === 'textarea') {
                //              beforeT = document.getElementById(classorid).value;
                //             } else if(tagType === 'input') { 
                //              beforeT = document.getElementById(classorid).value;
                //             } else {
                //              beforeT = document.getElementById(classorid).innerText;
                //             }
                //            let text = document.getElementById(classorid).innerText = singleLine.value;
                //            parent.window.callUpdate(beforeT, text);
                //            parent.window.calledAlready(true);
                //         });
                      
                //         iconContainer.style.marginBottom = '10px';
                      
                //         headText.style.marginRight = '20px';
                //         let icon = document.createElement('div');
                //         icon.className = 'fa fa-angle-left';
                //         icon.fontSize = '40px';
                //         head.style.height = '35px';
                //             head.style.width = '100%';
                //             head.style.borderBottom = '1px solid #DDE0EB'; 
                //         let overlaySide;
                //         if(localStorage.getItem("remixhead3") === null) {
                //             headText.appendChild(document.createTextNode('CHANGE IMAGE'))
                            
                //             head.style.display = 'flex';
                //             head.style.justifyContent = 'center';
                //             head.style.alignItems = 'center';
                            
                //             head.appendChild(iconContainer);
                //             iconContainer.appendChild(icon);
                //             head.appendChild(headText);
                            
                //             head.setAttribute("id", "remixhead3");
                //             overlay.appendChild(head);
                //             parent.window.croppedImageUrl = bi;
                //             iconContainer.addEventListener('click', function() {
                //                 //overlay.style.visibility = 'hidden';
                //             })
                //             localStorage.setItem("remixhead3", true);
                //             secondCreated = true;
                //         }
                //         } else {
                //             overlay.style.visibility = 'visible';
                //         }
                //     })
                   
    }
    testFR(elId) {
      
       

        //document.getElementsByClassName('ReactCrop__image')[0].src = localStorage.getItem( "savedImageData" );
        
        // document.getElementById('drop-area').style.display = 'none';
        // let overlayMenu = document.createElement('div');
        // overlayMenu.style.height = '100%';
        // overlayMenu.style.width = '403px';
        // overlayMenu.style.position = 'absolute';
        // overlayMenu.style.background = 'rgb(252, 253, 255)';

        // let content = document.createElement('div');
        // content.style.height = '100%';
        // content.style.width = '394px';
        // content.style.display = 'flex';
        // content.style.borderRight = '1px solid rgb(221, 224, 235)';
        // content.style.flexDirection = 'column';
        // content.style.alignItems = 'center';
        

        // let remixm = document.getElementsByClassName('remix-m')[0];
        
        // document.getElementsByClassName('remix-m')[0].style.display = 'flex';  
        
        // let header = document.createElement('div');
        // header.style.height ='33px';
        // header.style.width ='396px';
        // header.style.borderBottom ='1px solid rgb(221, 224, 235)';
        // header.style.borderRight ='1px solid rgb(221, 224, 235)';
        // let headerTitle = document.createElement('p');
        // headerTitle.appendChild(document.createTextNode('REMIX'));
        // header.appendChild(headerTitle);
        // headerTitle.style.marginLeft = 'auto';
        // headerTitle.style.marginRight = 'auto';
        // headerTitle.style.width = '44px';
        // headerTitle.style.position = 'relative';
        // headerTitle.style.color = 'rgb(221, 224, 235)';
        // headerTitle.style.top = '4px';
        // let backArrow = document.createElement('i');
        // backArrow.className = 'fa fa-angle-left';
        // backArrow.style.position = 'absolute';
        // backArrow.style.top = '6px';
        // backArrow.style.left = '10px';
        // backArrow.style.fontSize = '18px';
        // backArrow.style.color = 'rgb(221, 224, 235)';

        // backArrow.addEventListener('click',function(){
        //     overlayMenu.remove();
        // });

        // let replaceBtn = document.createElement('div');
        // let replaceIcon = document.createElement('i');

        // let cropBtn = document.createElement('div');
        // let cropIcon = document.createElement('i');
        
        // let eraseBtn = document.createElement('div');
        // let eraseBtnIcon = document.createElement('i');

        // let saveBtn = document.createElement('div');
        // let saveBtnIcon = document.createElement('i');

        // cropBtn.style.height = '50px';
        // cropBtn.style.width = '348px';
        // cropBtn.style.border = '1px solid rgb(221, 224, 235)';
        // cropBtn.style.position = 'relative';
        // cropBtn.style.top = '66px';
        // cropBtn.style.borderRadius = '5px';
        // cropBtn.style.display = 'flex';
        // cropBtn.style.alignItems = 'center';
        // cropBtn.style.marginBottom = '20px';
        // cropIcon.style.marginLeft = '15px';
        // cropIcon.style.fontSize = '20px';
        // cropIcon.className = 'fa fa-crop';


        // eraseBtn.style.height = '50px';
        // eraseBtn.style.width = '348px';
        // eraseBtn.style.border = '1px solid rgb(221, 224, 235)';
        // eraseBtn.style.position = 'relative';
        // eraseBtn.style.top = '66px';
        // eraseBtn.style.borderRadius = '5px';
        // eraseBtn.style.display = 'flex';
        // eraseBtn.style.alignItems = 'center';
        // eraseBtn.style.marginBottom = '20px';
        // eraseBtnIcon.style.marginLeft = '15px';
        // eraseBtn.style.fontSize = '20px';
        // eraseBtnIcon.className = 'fa fa-eraser';

        // eraseBtn.addEventListener('click', ()=>{
        //     //document.getElementById('canvas').style.display = 'block';
        // })

        // replaceBtn.style.height = '50px';
        // replaceBtn.style.width = '348px';
        // replaceBtn.style.border = '1px solid rgb(221, 224, 235)';
        // replaceBtn.style.position = 'relative';
        // replaceBtn.style.top = '66px';
        // replaceBtn.style.borderRadius = '5px';
        // replaceBtn.style.display = 'flex';
        // replaceBtn.style.alignItems = 'center';
        // replaceIcon.style.marginLeft = '15px';
        // replaceIcon.style.fontSize = '20px';
        // replaceBtn.style.marginBottom = '20px';
        // replaceIcon.className = 'fa fa-crop';

        // saveBtn.style.height = '50px';
        // saveBtn.style.width = '348px';
        // saveBtn.style.border = '1px solid rgb(221, 224, 235)';
        // saveBtn.style.position = 'relative';
        // saveBtn.style.top = '66px';
        // saveBtn.style.borderRadius = '5px';
        // saveBtn.style.display = 'flex';
        // saveBtn.style.alignItems = 'center';
        // saveBtnIcon.style.marginLeft = '15px';
        // saveBtnIcon.style.fontSize = '20px';
        // saveBtn.style.marginBottom = '20px';
        // saveBtnIcon.className = 'fa fa-floppy-o';


        // let cropTxtEl = document.createElement('p');
        // let cropText = document.createTextNode('Crop');
        
        // let replaceTxtEl = document.createElement('p');
        // let replaceText = document.createTextNode('Replace Image');

        // let eraseTxtEl = document.createElement('p');
        // let eraseText = document.createTextNode('Erase');

        // let saveTxtEl = document.createElement('p');
        // let saveText = document.createTextNode('Save');

        // replaceTxtEl.appendChild(replaceText);
        // replaceTxtEl.style.marginLeft = '10px';

        // replaceBtn.appendChild(replaceIcon);
        // replaceBtn.appendChild(replaceTxtEl);
        // replaceBtn.addEventListener('click', ()=>{
        //     // document.getElementById('drop-area').style.display = 'block';
        //     // document.getElementsByClassName('ReactCrop')[0].style.display = 'none';
        //     // document.getElementById('canvas-load').style.display = 'block';
        // })
        
        // cropTxtEl.appendChild(cropText);
        // cropTxtEl.style.marginLeft = '10px';

        // cropBtn.appendChild(cropIcon);
        // cropBtn.appendChild(cropTxtEl);

        // eraseTxtEl.appendChild(eraseText);
        // eraseTxtEl.style.marginLeft = '10px';

        // eraseBtn.appendChild(replaceIcon);
        // eraseBtn.appendChild(eraseTxtEl);
        
        // saveTxtEl.appendChild(saveText);
        // saveTxtEl.style.marginLeft = '10px';

        // saveBtn.appendChild(saveBtnIcon);
        // saveBtn.appendChild(saveTxtEl);
        //saveBtn.addEventListener('click',()=>{
            // document.getElementsByClassName('ReactCrop')[0].style.display = 'none'
            // document.getElementById('canvas').style.display = 'block'
            // let canvas = document.getElementById('canvas-load');
            // let dataURL = canvas.toDataURL();
          
            // elId = elId.substring(1);
    
            // var iframe = document.getElementById("output_frame");
            // var elmnt = iframe.contentWindow.document.getElementById(elId);
            // elmnt.getElementById(elId).style.backgroundImage = `url(${dataURL})`;
        
       // })

            
       
       

        // header.appendChild(backArrow);
       

        // overlayMenu.appendChild(content);
 
        // content.appendChild(header);
      
        // content.appendChild(remixm);

        
        // document.getElementById('main-menu').appendChild(overlayMenu);

 
            // function createCanvas(parent, width, height) {
            //     var canvas = {};
            //     canvas.node = document.getElementById('canvas-load');
            //     canvas.context = canvas.node.getContext('2d');
            //     canvas.node.width = width || 100;
            //     canvas.node.height = height || 100;
            //     parent.appendChild(canvas.node);
            //     return canvas;
            // }

            // function init(canvas, width, height, fillColor) {
            //     var canvas = createCanvas(container, width, height);
            //     var ctx = canvas.context;
            //     // define a custom fillCircle method
            //     ctx.fillCircle = function(x, y, radius, fillColor) {
            //         this.fillStyle = fillColor;
            //         this.beginPath();
            //         this.moveTo(x, y);
            //         this.arc(x, y, radius, 0, Math.PI * 2, false);
            //         this.fill();
            //     };
            //     ctx.clearTo = function(fillColor) {
            //         ctx.fillStyle = fillColor;
            //         ctx.fillRect(0, 0, width, height);
            //     };
            //     //ctx.clearTo(fillColor || "#ddd");

            //     function getMousePos(canvas, evt) {
            //         var rect = canvas.getBoundingClientRect();
            //         return {
            //             x: evt.clientX - rect.left,
            //             y: evt.clientY - rect.top
            //         };
            //     }
            //     // bind mouse events
            //     canvas.node.onmousemove = function(e) {
            //         if (!canvas.isDrawing) {
            //            return;
            //         }
            //         var pos = getMousePos(canvas.node, e);

            //         var x = pos.x;
            //         var y = pos.y;
            //         var radius = 10; // or whatever
            //         var fillColor = 'blue';
            //         ctx.globalCompositeOperation = 'destination-out';
            //         ctx.fillCircle(x, y, radius, fillColor);
            //     };
            //     canvas.node.onmousedown = function(e) {
            //         canvas.isDrawing = true;
            //     };
            //     canvas.node.onmouseup = function(e) {
            //         canvas.isDrawing = false;
            //     };
            // }
        
            // var container = document.getElementById('canvas');
            // init(container, 300, 288, '#ddd');
            

        // const reader = new FileReader();
        // reader.addEventListener('load', () =>
        //   this.setState({ src: localStorage.getItem( "savedImageData" ) }),
        // );
        // document.getElementById('drop-area').style.display = 'none';
        // reader.readAsDataURL(localStorage.getItem( "savedImageData" ));
      
    }
    onCropConfirm(e) {
        alert(e)
    }
    handlerFunction(e){

    }
    onSelectFile = e => {        
        // if (e.target.files && e.target.files.length > 0) {
        //   const reader = new FileReader();
        //   reader.addEventListener('load', () =>
        //     this.setState({ src: reader.result }),
        //   );
        //   document.getElementById('drop-area').style.display = 'none';
        //   reader.readAsDataURL(e.target.files[0]);
          
        // }
      }
      handleFiles(files) {
  
        // if (files && files.length > 0) {
        //     const reader = new FileReader();
        //     reader.addEventListener('load', () => {
        //       this.setState({ src: reader.result });
              
             
                
              
        //     });
        //     document.getElementById('drop-area').style.display = 'none';
        //     reader.readAsDataURL(files[0]);
            
        //     function createCanvas(parent, width, height) {
        //         var canvas = {};
        //         canvas.node = document.getElementById('canvas-load');
        //         canvas.context = canvas.node.getContext('2d');
        //         canvas.node.width = width || 100;
        //         canvas.node.height = height || 100;
        //         parent.appendChild(canvas.node);
        //         return canvas;
        //     }

        //     function init(canvas, width, height, fillColor) {
        //         var canvas = createCanvas(container, width, height);
        //         var ctx = canvas.context;
        //         // define a custom fillCircle method
        //         ctx.fillCircle = function(x, y, radius, fillColor) {
        //             this.fillStyle = fillColor;
        //             this.beginPath();
        //             this.moveTo(x, y);
        //             this.arc(x, y, radius, 0, Math.PI * 2, false);
        //             this.fill();
        //         };
        //         ctx.clearTo = function(fillColor) {
        //             ctx.fillStyle = fillColor;
        //             ctx.fillRect(0, 0, width, height);
        //         };
        //         //ctx.clearTo(fillColor || "#ddd");

        //         function getMousePos(canvas, evt) {
        //             var rect = canvas.getBoundingClientRect();
        //             return {
        //                 x: evt.clientX - rect.left,
        //                 y: evt.clientY - rect.top
        //             };
        //         }
        //         // bind mouse events
        //         canvas.node.onmousemove = function(e) {
        //             if (!canvas.isDrawing) {
        //                return;
        //             }
        //             var pos = getMousePos(canvas.node, e);

        //             var x = pos.x;
        //             var y = pos.y;
        //             var radius = 10; // or whatever
        //             var fillColor = 'blue';
        //             ctx.globalCompositeOperation = 'destination-out';
        //             ctx.fillCircle(x, y, radius, fillColor);
        //         };
        //         canvas.node.onmousedown = function(e) {
        //             canvas.isDrawing = true;
        //         };
        //         canvas.node.onmouseup = function(e) {
        //             canvas.isDrawing = false;
        //         };
        //     }
        
        //     var container = document.getElementById('canvas');
        //     init(container, 347, 241, '#ddd');
            
            

        //   }
          
      }
     handleDrop(e) {
        // let dt = e.dataTransfer
        // let files = dt.files
      
        // this.handleFiles(files)
    }

      onImageLoaded = (image, pixelCrop) => {
          
       // document.getElementsByClassName('ReactCrop__crop-selection')[0].style.display = 'none';
        
        //this.imageRef = image;
        
      };
    
      onCropComplete = (crop, pixelCrop) => {
        //this.makeClientCrop(crop, pixelCrop);
        
      };
    
      onCropChange = crop => {
        //this.setState({ crop });
      };
    
      async makeClientCrop(crop, pixelCrop) {
        // if (this.imageRef && crop.width && crop.height) {
        //   const croppedImageUrl = await this.getCroppedImg(
        //     this.imageRef,
        //     pixelCrop,
        //     'newFile.jpeg',
        //   );
        //   this.setState({ croppedImageUrl });
        // }
      }
    
      getCroppedImg(image, pixelCrop, fileName) {
        // const canvas = document.createElement('canvas');
        // canvas.width = pixelCrop.width;
        // canvas.height = pixelCrop.height;
        // const ctx = canvas.getContext('2d');
        // ctx.globalCompositeOperation = "lighter";
       
        // ctx.drawImage(
        //   image,
        //   pixelCrop.x,
        //   pixelCrop.y,
        //   pixelCrop.width,
        //   pixelCrop.height,
        //   0,
        //   0,
        //   pixelCrop.width,
        //   pixelCrop.height,
        // );
        
        // return new Promise((resolve, reject) => {
        //   canvas.toBlob(blob => {
        //     if (!blob) {
        //       //reject(new Error('Canvas is empty'));
        //       console.error('Canvas is empty');
        //       return;
        //     }
        //     blob.name = fileName;
        //     window.URL.revokeObjectURL(this.fileUrl);
        //     this.fileUrl = window.URL.createObjectURL(blob);
        //     resolve(this.fileUrl);
        //   }, 'image/png');
        // });
      }

    render() {
       const { currentpic, pic } = this.state;
       window.onload = function () { 
        document.getElementById('clearBtn').addEventListener('click', ()=>{
            var canvas = document.getElementsByClassName("pesdk-react-canvas__canvas")[0];

            const context = canvas.getContext('2d');
    
            context.clearRect(0, 0);
        })
     

       }

        return(<div id="menu-wrap" style={{background:'#181818',
            position:'absolute',
            zIndex:'99999999999',
            height:'100%',
            width:'381px',
            overflow:'hidden',
            display:this.state.pic ? 'flex' : 'none',
            justifyContent:'center'
        }}>
        <div id="menu" style={{height:'550px',
            width:'396px',
            display:this.state.pic ? 'block' : 'none',
            }}>
            <div style={{height:'32px',width:'100%',borderBottom:'1px solid #202020',background:'rgb(24, 24, 24)', display:'flex', justifyContent:'space-between'}}>
              <i className="far fa-caret-square-left" style={{color:'white'}}/>
              <div><p style={{color:'white'}}>Swap or Edit Image</p></div>
              <i className="far fa-caret-square-left" style={{color:'white'}}/>
            </div>
            {this.state.pic ?<PhotoEditor image={this.state.pic} 
            classorid={this.state.classorid}
            type={this.state.type}
            id={this.state.id}
            />:''}
            
            
            
      

            <div className="remix-m" style={{height:'243px',width:'348px',overflow:'hidden',
            border:'1px solid rgb(221, 224, 235)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            padding:'12px',
            position:'relative',
            top:'32px'
            }}>
            </div>
           { 
          
            
          

           }
                   {/* <div style={{display:'flex',flexDirection:'row'}}>
          <input id="img-file" type="file" onChange={this.onSelectFile} style={{display:'none'}}/>
          <div id="drop-area">
  <form className="my-form">
    <p>Drag</p>
    <input type="file" id="fileElem" multiple accept="image/*" onChange={this.handleFiles(this.files)} onClick={this.onSelectFile.bind(this)} style={{display:'none'}}/>
    <label className="button" for="fileElem">Browse</label>
  </form>
</div> */}

        {/* </div> */}
        
      
        
        {/* <div id="canvas" style={{display:'none',background:'transparent'}}>
            <canvas id="canvas-load" style={{height:242,width:346}}></canvas>
        </div>
        <img id="img-cropped" alt="Crop" style={{ maxWidth: '100%', display:'none',position:'absolute', background:'transparent' }} imageStyle={{background:'transparent'}} src={croppedImageUrl} />

        <canvas id="final-result" style={{display:'none',background:'transparent'}}></canvas>
        </div> */}
  
            
                       {/* <div id="button-area" style={{
    height:'33px',
    width:'394px',
    zIndex: 999999,
    display:'flex',
    top:'16px',
    position:'relative',
    alignItems:'center',
    justifyContent:'space-between',padding:'22px'}}>
            <div onClick={()=>{ document.getElementsByClassName('ReactCrop__crop-selection')[0].style.display = 'block'; }}><i className="fa fa-crop" style={{display:'flex',
    color:'rgb(221, 224, 235)',
    fontSize:'18px'}}></i></div>
            <i className="fa fa-arrow-left" style={{display:'flex',
    color:'rgb(221, 224, 235)',
    fontSize:'18px'}}></i>
            <i className="fa fa-arrow-right" style={{display:'flex',
    color:'rgb(221, 224, 235)',
    fontSize:'18px'}}></i>
            <i className="fa fa-reply" style={{display:'flex',
    color:'rgb(221, 224, 235)',
    fontSize:'18px'}}></i>
            <i className="fa fa-share" style={{display:'flex',
    color:'rgb(221, 224, 235)',
    fontSize:'18px'}}></i>
                <i className="fa fa-floppy-o" id="next" onClick={()=> {
                    document.getElementsByClassName('ReactCrop')[0].style.display = 'none'
                    document.getElementById('canvas').style.display = 'block'
              
                }} style={{display:'flex',
                color:'rgb(221, 224, 235)',
                fontSize:'18px'}}></i>
                <i id="next" onClick={()=> {
                    document.getElementsByClassName('ReactCrop')[0].style.display = 'none'
                    document.getElementById('canvas').style.display = 'block'
              
                }} style={{display:'flex',
                color:'rgb(221, 224, 235)',
                fontSize:'18px'}}>skip</i>
            </div> */}
            </div>
            
        </div>
        
        )
    }
    getImg() {
      
        
    }
 }



export default ImageEdit;