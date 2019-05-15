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
            id:'',
            elementId:''
        }
    }
    componentDidMount() {
        document.getElementsByClassName('remix-m')[0].style.display = 'none';  
     
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
        let remixImageListOptions = ['Actors', 'Elements', 'Effects'];
        let list = document.getElementById('main-menu');
        let getList = JSON.parse(localStorage.getItem( "FR_REMIX_LIST"));
        let remixImageList = document.createElement('div');
            remixImageList.setAttribute("id", "remix-image-list");
            remixImageList.style.flexDirection = 'column';
            remixImageList.style.width = '100%';
        let remixImageTitle = document.createElement('div');
        let menuinfo = document.createElement('div');
        
        menuinfo.setAttribute("id", "menu-info");
        menuinfo.style.height = '170px';
        menuinfo.style.width = '259px';
        let menuinfobox = document.createElement('div');
        let menuinfotop = document.createElement('div');
        menuinfotop.style.display = 'flex';
        menuinfotop.style.justifyContent = 'space-between';
        menuinfotop.style.height = '20px';
        menuinfotop.style.width = '100%';
        menuinfobox.style.border = '1px solid #222222';
        menuinfobox.style.height = '147px';
        menuinfobox.style.width = '259px';
        menuinfobox.style.borderRadius = '3px';
        menuinfobox.style.marginTop = '11px';

        menuinfobox.appendChild(menuinfotop)
    
        menuinfo.appendChild(menuinfobox);
        let imgtitle = document.createElement('p');
        let imgclose = document.createElement('p');
        let remixImageListNav = document.createElement('div');
        let remixImageListNavArrows = document.createElement('div');
        let remixImageWrap = document.createElement('div');
        remixImageWrap.setAttribute("id", "remix-list");
        remixImageListNavArrows.style.display = 'flex';
        remixImageListNavArrows.style.position = 'absolute';
        remixImageListNavArrows.style.right = '14px';
        remixImageListNavArrows.style.width = '19px';
        remixImageListNavArrows.style.justifyContent = 'space-between';
        remixImageListNavArrows.style.fontSize = '14px';
        let remixImageBox = document.createElement('div');
        //remixImageBox.style.border = '1px solid red';
        remixImageBox.style.height = '330px';
        remixImageBox.style.width = '269px';
        remixImageBox.style.overflow = 'hidden';
        remixImageBox.setAttribute("id", "remix-image-box");

        let backArrow = document.createElement('i');
        let forwardArrow = document.createElement('i');
        backArrow.className = 'fas fa-chevron-left';
        forwardArrow.className = 'fas fa-chevron-right';
        backArrow.style.color = '#6a6a6a';
        forwardArrow.style.color = '#6a6a6a';
        backArrow.style.fontSize = '12px';
        forwardArrow.style.fontSize = '12px';
        backArrow.style.fontWeight = '800';
        forwardArrow.style.fontWeight = '800';
        remixImageListNavArrows.appendChild(backArrow);
        remixImageListNavArrows.appendChild(forwardArrow);
        
        remixImageListNav.style.height = '37px';
        remixImageListNav.style.width = '100%';
        remixImageListNav.style.paddingLeft = '10px';
        remixImageListNav.style.display = 'flex';
        remixImageListNav.style.flexDirection = 'row';
        remixImageListNav.style.color = 'rgb(64, 255, 232)';
        remixImageListNav.style.fontSize = '12px';
        remixImageListNav.style.alignItems = 'center';
        remixImageListNav.style.listStyleType = 'none';

        let remixImageListNavUL = document.createElement('ul');
        remixImageListNav.appendChild(remixImageListNavUL);
       
         for(let i = 0; i < remixImageListOptions.length; i++) {
          let remixImageListItem = document.createElement('li');
            remixImageListItem.style.marginRight = '20px';
            remixImageListItem.style.height = '20px';
 
            remixImageListItem.style.textAlign = 'center';
            remixImageListItem.style.alignItems = '38px';
            remixImageListItem.style.display = 'flex';
            remixImageListItem.style.justifyContent = 'center';
            remixImageListItem.style.paddingLeft = '6px';
            remixImageListItem.style.paddingRight = '6px';
            remixImageListItem.style.marginRight = '20px';
            remixImageListItem.className = 'notSelectedRM';
            remixImageListItem.setAttribute("id", `${remixImageListOptions[i]}`)
            remixImageListItem.appendChild(document.createTextNode(remixImageListOptions[i]));
            if(remixImageListItem.id === remixImageListOptions[0]) {
              remixImageListItem.className = 'selectedRM';
            }
            remixImageListItem.addEventListener('click', ()=>{
              remixImageListItem.className = 'selectedRM';
              
              let getsel = document.getElementsByClassName('selectedRM');
              
              for(let i = 0; i < getsel.length; i++) {
                if(getsel[i].id !== remixImageListItem.id) {
                  getsel[i].className = 'notSelectedRM';
                }
              }
            })
            remixImageListNav.appendChild(remixImageListItem);
            remixImageListNav.appendChild(remixImageListNavArrows);
         }
        let imgico = document.createElement('i');
        imgico.className = 'fas fa-image';
        imgtitle.appendChild(imgico);
        imgtitle.appendChild(document.createTextNode('Images'));
        imgclose.appendChild(document.createTextNode('Close'));
        imgtitle.style.color = 'white';
        imgtitle.style.fontSize = '13px';
        imgtitle.style.marginLeft = '10px';
        imgtitle.style.fontWeight = '900';
        imgtitle.style.marginTop = '4px';
        imgclose.style.color = 'white';
        imgclose.style.fontSize = '10px';
        imgclose.style.marginRight = '20px'
        imgclose.addEventListener('click', function() {
          if(imgclose.innerText === 'Close') {
            remixImageList.style.display = 'none';
            remixImageBox.style.height = '33px';
            imgclose.innerText = 'Open';
          } else {
            remixImageList.style.display = 'block';
            remixImageBox.style.height = '330px';
            imgclose.innerText = 'Close';
            
          }
          
        });
        remixImageTitle.style.height = '28px';
        remixImageTitle.style.width = '100%';
        remixImageTitle.style.backgroundColor = '#141414';
        remixImageTitle.style.alignItems = 'center';
        remixImageTitle.style.display = 'flex';
        remixImageTitle.style.justifyContent = 'space-between';
        imgico.style.marginRight = '7px';
        remixImageTitle.appendChild(imgtitle);
        remixImageTitle.appendChild(imgclose);

        remixImageList.appendChild(remixImageListNav);

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
                      
                
                      let bgImgWrap = document.createElement('div');       
                      let bgImg = document.createElement('div'); 
                      let itemInfoWrap = document.createElement('div');
                      let itemInfo = document.createElement('p');
                      let itemInfot = document.createElement('p');
                      let itemInfoh = document.createElement('p');
                      let itemInfoEdit = document.createElement('p');
                      
                      // itemInfo.appendChild(document.createTextNode('Pac-man'));
                      // itemInfot.appendChild(document.createTextNode('Hero'));
                      // itemInfoh.appendChild(document.createTextNode('100px x 100px'));
                      //itemInfoEdit.appendChild(document.createTextNode('Edit'));

                     

                      itemInfoWrap.style.height = '62px';
                      itemInfoWrap.style.width = '120px';
                      itemInfoWrap.style.backgroundColor = 'rgb(24, 24, 24)';
                      itemInfo.style.fontSize = '12px';
                      itemInfo.style.color = 'white';
                      itemInfo.style.fontWeight = '0';
                      itemInfo.style.marginLeft = '7px';
                      itemInfo.style.marginTop = '4px';
                      itemInfo.style.height = '14px';

                      itemInfot.style.fontSize = '10px';
                      itemInfot.style.color = '#2b2b2b';
                      itemInfot.style.height = '14px';
                      itemInfot.style.fontWeight = '0';
                      itemInfot.style.marginLeft = '7px';
                

                      itemInfo.style.fontSize = '12px';

                      itemInfoh.style.fontSize = '10px';
                      itemInfoh.style.color = '#2b2b2b';
                      itemInfoh.style.height = '13px';
                      itemInfoh.style.fontWeight = '0';
                      itemInfoh.style.marginLeft = '7px';
                      
                      itemInfoEdit.style.fontSize = '11px';
                      itemInfoEdit.style.color = '#767676';
                      itemInfoEdit.style.fontWeight = '0';
                      itemInfoEdit.style.marginLeft = '7px';

                      itemInfoWrap.appendChild(itemInfo);
                      itemInfoWrap.appendChild(itemInfot);
                      itemInfoWrap.appendChild(itemInfoh);
                      itemInfoWrap.appendChild(itemInfoEdit);

                      bgImg.style.backgroundImage = `url(${getList[j].image})`;
                      bgImg.style.height = '99px';
                      bgImg.style.width = '111px';
                      bgImg.style.backgroundSize = 'cover';
                      bgImg.style.backgroundPosition = 'center';
                      bgImg.setAttribute("id", `image_edit_${j}`)

                    bgImgWrap.style.height = '179px';
                    bgImgWrap.style.width = '113px';
                    bgImgWrap.style.display = 'flex';
                    bgImgWrap.style.justifyContent = 'center';
                    bgImgWrap.style.alignItems = 'center';
                    bgImgWrap.style.marginLeft = '6px';
                    bgImgWrap.style.borderRadius = '5px';
                    bgImgWrap.style.backgroundColor = '#252525';
                    
                    item.style.height = '120px';
                    item.style.width = '113px';

                    item.style.margin = '3px 6px 5px 7px';

    
                    item.style.display = 'flex';
                    item.style.alignItems = 'center';
                    item.style.borderRadius = '3px';
                    item.style.backgroundColor = '#1f1f1f';
                  
                    bgImgWrap.style.position = 'relative';
                    bgImgWrap.style.border = '0px solid red';
                    item.style.display = 'flex';
                    item.style.flexDirection = 'column';
                    item.style.height = '179px';
                    item.style.width = '113px';


                    
                    bgImgWrap.appendChild(bgImg)
                    item.appendChild(bgImgWrap);
                    item.appendChild(itemInfoWrap);
                   
                    remixImageList.appendChild(remixImageWrap);
          
                    remixImageWrap.style.height = '250px';
                    remixImageWrap.style.overflowY = 'scroll';
                    remixImageWrap.style.display = 'flex';
                    remixImageWrap.style.flexWrap = 'wrap';
                    
                    remixImageWrap.appendChild(item);

                    //if(getList[j].type === 'url') {
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
                        console.log('id :', getList[j].id)
                        
                        that.setState({pic:getImageSaved, id:getList[j].id, classorid:getList[j].classorid, type:getList[j].type, elementId:`image_edit_${j}`})

                        document.getElementById('menu-wrap').style.height = '583px';
                
                        
                        //testFR(elId);
                        }
                        that.setState({pic:false});
                        img.src = getList[j].image;
                    
                        

                        
                    })

                   // } else {

                    // item.addEventListener('click', ()=> {
                        
                    //     let img = new Image;
                    //     img.setAttribute('crossOrigin', 'anonymous'); 
                        
                    //     let canvas = document.createElement('canvas');
                    //     let ctx = canvas.getContext("2d");
                        
                    
                    //     img.onload = function() {
                       
                    //     canvas.width = img.width;
                    //     canvas.height = img.height;
                    //     ctx.drawImage( img, 0, 0 );
                    //     localStorage.setItem( `savedImageData${j}`, canvas.toDataURL("image/png") );
                    //     let getImageSaved = localStorage.getItem(`savedImageData${j}`);
                        
                        
                    //      document.getElementById('menu-wrap').style.display = 'block';
                    //     document.getElementById('menu').style.display = 'block';
                    //     that.setState({pic:getImageSaved,id:getList[j].id,classorid:getList[j].classorid, type:getList[j].type})

                        
                        
                    //     //testFR(elId);
                    //     }
                    //     img.src = getList[j].image;
                    
                        

                        
                    // })

                   // }

                  }
              
                  list.style.padding = '7px 14px 2px 7px';
                  remixImageBox.appendChild(remixImageTitle);
                  remixImageBox.appendChild(remixImageList);
                  list.appendChild(menuinfo);
                  list.appendChild(remixImageBox)



                   
                }
            
                   
    }

    testFR(elId) {
      
       


      
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
            width:'100%',
            overflow:'hidden',
            display:this.state.pic ? 'flex' : 'none',
            justifyContent:'center'
        }}>
        <div id="menu" style={{height:'550px',
            width:'396px',
            display:this.state.pic ? 'block' : 'none',
            }}>
            <div style={{
              height:'32px',
              width:'100%',
              borderBottom:'1px solid #202020',
              background:'rgb(24, 24, 24)', 
              display:'flex', 
              justifyContent:'space-between',
              alignItems:'center'
            }}>
              <i onClick={()=> {
                //document.getElementById('menu-wrap').style.display = 'none';
              }} className="fas fa-arrow-circle-left" style={{color:'white',fontSize:'20px',marginLeft:20}}></i>
              <div><p style={{color:'white'}}>Swap or Edit Image</p></div>
              <i className="fas fa-window-close" style={{color:'white', fontSize:20, marginRight:20}}/>
            </div>
            {this.state.pic ? <PhotoEditor elementId={this.state.elementId} image={this.state.pic} 
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