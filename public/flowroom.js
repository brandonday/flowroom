(function(window) {
    'use strict'

    let calledOnce = false;
    //figure this all out review library creation vid
    let counter = 0;
    let elId;
    let currentImage;




  //function defineFlowroom() {
    let flowroom = {

       elId:'',
       RemixImage:function(elId, contentType, btnLabel) {

                this.elId = elId;
                let FR_REMIX_LIST = JSON.parse(localStorage.getItem("FR_REMIX_LIST"));
                if(FR_REMIX_LIST === null) {
                    FR_REMIX_LIST = [];
                } else {
                    FR_REMIX_LIST = JSON.parse(localStorage.getItem("FR_REMIX_LIST"));
                }



            let list = parent.document.getElementById('main-menu');
            let item = parent.document.createElement('li');
            if(this.elId.charAt(0) === '.') {
                let classorid = flowroom.elId.substring(1);

                classorid = classorid.toString();


                    var img = document.getElementsByClassName(`${classorid}`)[0];
                    let style = img.currentStyle || window.getComputedStyle(img, false);
                    let bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");


                 if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(1)) === -1) { /*I keep (0) in case a class is an id too*/
                    // let bgImg = document.createElement('div');
                    // let text = document.createElement('p');
                    // text.style.marginRight = '55px';


                    // text.appendChild(document.createTextNode('CHANGE IMAGE'))
                    // bgImg.style.backgroundImage = `url(${bi})`;
                    // bgImg.style.height = '40px';
                    // bgImg.style.width = '40px';
                    // bgImg.style.backgroundSize = 'cover';

                    // item.style.height = '50px';
                    // item.style.width = '348px';

                    // item.style.marginTop = '10px';
                    // item.style.marginBottom = '10px';

                    // item.style.marginLeft = 'auto';
                    // item.style.marginRight = 'auto';

                    // item.style.border = '1px solid #DDE0EB';
                    // item.style.display = 'flex';
                    // item.style.alignItems = 'center';

                    // item.style.borderRadius = '5px';

                    // bgImg.style.marginRight = '5px';
                    // bgImg.style.marginLeft = '7px';
                    // bgImg.style.position = 'relative';
                    // item.style.display = 'flex';
                    // //item.style.justifyContent = 'flex-end';

                    // bgImg.style.right = '0px';
                    // item.appendChild(bgImg);
                    // item.appendChild(text);
                    // list.appendChild(item);
                    // item.addEventListener('click', function() {

                    //     var img = new Image,
                    //     canvas = document.createElement("canvas"),
                    //     ctx = canvas.getContext("2d"),
                    //     src = bi; // insert image url here

                    // img.crossOrigin = "Anonymous";

                    // img.onload = function() {
                    //     canvas.width = img.width;
                    //     canvas.height = img.height;
                    //     ctx.drawImage( img, 0, 0 );
                    //     localStorage.setItem( "savedImageData", canvas.toDataURL("image/png") );
                    //     testFR(elId);
                    // }
                    // img.src = src;

                    // make sure the load event fires for cached images too
                    // if ( img.complete || img.complete === undefined ) {
                    //     img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                    //     img.src = bi;
                    // }


                            //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");


                        //   var base64 = getBase64Image(bi);
                        //   alert(base64)




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



                  //var base64 = getBase64Image('https://i.pinimg.com/originals/69/64/4d/69644d2af4e6bf16fcf88a9ac1b275d6.jpg');

                          //alert(base64)
                          //testFR(base64);
                        //window.top
                        //alert(classorid);
                        //if(secondCreated === false) {

                        // overlay.style.position = 'absolute';
                        // overlay.style.zIndex = '1';
                        // overlay.style.height = '100%';
                        // overlay.style.width = '100%';
                        // overlay.style.backgroundColor = 'white';
                        // overlay.style.visibility = 'visible';

                        // overlay.style.alignItems = 'center';
                        // overlay.style.display = 'flex';
                        // overlay.style.flexDirection = 'column';

                        // let oside = parent.document.getElementById('main-menu');

                        // oside.appendChild(overlay);

                        // let head = document.createElement('div');
                        // let headText = document.createElement('p');
                        // let iconContainer = document.createElement('div');
                        // let descriptionText = document.createElement('p');
                        // let saveBTN = document.createElement('div');
                        // saveBTN.style.height = '30px';
                        // saveBTN.style.width = '150px';
                        // saveBTN.style.border = '1px solid black';
                        // saveBTN.style.borderRadius = '6px';
                        // saveBTN.style.marginTop = '10px';
                        // saveBTN.appendChild(document.createTextNode('SAVE'));
                        // saveBTN.style.display = 'flex';
                        // saveBTN.style.justifyContent = 'center';
                        // saveBTN.style.alignItems = 'center';
                        // saveBTN.addEventListener('click', ()=> {
                        //     let beforeT;
                        //     if(tagType === 'textarea') {
                        //      beforeT = document.getElementById(classorid).value;
                        //     } else if(tagType === 'input') {
                        //      beforeT = document.getElementById(classorid).value;
                        //     } else {
                        //      beforeT = document.getElementById(classorid).innerText;
                        //     }

                        //     if(tagType === 'textarea') {
                        //      beforeT = document.getElementById(classorid).value;
                        //     } else if(tagType === 'input') {
                        //      beforeT = document.getElementById(classorid).value;
                        //     } else {
                        //      beforeT = document.getElementById(classorid).innerText;
                        //     }
                        //    let text = document.getElementById(classorid).innerText = singleLine.value;
                        //    parent.window.callUpdate(beforeT, text);
                        //    parent.window.calledAlready(true);
                        // });

                        // iconContainer.style.marginBottom = '10px';

                        // headText.style.marginRight = '20px';
                        // let icon = document.createElement('div');
                        // icon.className = 'fa fa-angle-left';
                        // icon.fontSize = '40px';
                        // head.style.height = '35px';
                        //     head.style.width = '100%';
                        //     head.style.borderBottom = '1px solid #DDE0EB';
                        // let overlaySide;
                        // if(localStorage.getItem("remixhead3") === null) {
                        //     headText.appendChild(document.createTextNode('CHANGE IMAGE'))

                        //     head.style.display = 'flex';
                        //     head.style.justifyContent = 'center';
                        //     head.style.alignItems = 'center';

                        //     head.appendChild(iconContainer);
                        //     iconContainer.appendChild(icon);
                        //     head.appendChild(headText);

                        //     head.setAttribute("id", "remixhead3");
                        //     overlay.appendChild(head);
                        //     parent.window.croppedImageUrl = bi;
                        //     iconContainer.addEventListener('click', function() {
                        //         //overlay.style.visibility = 'hidden';
                        //     })
                        //     localStorage.setItem("remixhead3", true);
                        //     secondCreated = true;
                        // }
                        // } else {
                        //     overlay.style.visibility = 'visible';
                        // }
                    //})
                    FR_REMIX_LIST.push({[classorid]:classorid,image:bi,classorid:`${classorid}`,type:'class'});
                    console.log(FR_REMIX_LIST)
                    localStorage.setItem("FR_REMIX_LIST", JSON.stringify(FR_REMIX_LIST));
                 }
                //}
            } else if(this.elId.charAt(0) === '#') {
                let classorid = flowroom.elId.substring(1);
                //alert(classorid)
                classorid = classorid.toString();
                var img = document.getElementById(`${classorid}`);
                let style = img.currentStyle || window.getComputedStyle(img, false);
                let bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");

                // Display the url to the user
                //alert(flowroom.elId.substring(0))
                if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(1)) === -1) {




                        // iconContainer.style.marginBottom = '10px';

                        // headText.style.marginRight = '20px';
                        // let icon = document.createElement('div');
                        // icon.className = 'fa fa-angle-left';
                        // icon.fontSize = '40px';
                        // head.style.height = '35px';
                        //     head.style.width = '100%';
                        //     head.style.borderBottom = '1px solid #DDE0EB';
                        // let overlaySide;
                        // if(localStorage.getItem("remixhead3") === null) {
                        //     headText.appendChild(document.createTextNode('CHANGE IMAGE'))

                        //     head.style.display = 'flex';
                        //     head.style.justifyContent = 'center';
                        //     head.style.alignItems = 'center';

                        //     head.appendChild(iconContainer);
                        //     iconContainer.appendChild(icon);
                        //     head.appendChild(headText);

                        //     head.setAttribute("id", "remixhead3");
                        //     overlay.appendChild(head);
                        //     parent.window.croppedImageUrl = bi;
                        //     iconContainer.addEventListener('click', function() {
                        //         //overlay.style.visibility = 'hidden';
                        //     })
                        //     localStorage.setItem("remixhead3", true);
                        //     secondCreated = true;
                        // }
                        // } else {
                        //     overlay.style.visibility = 'visible';
                        // }
                    //})
                    //list.appendChild(item);
                    FR_REMIX_LIST.push({[classorid]:classorid,image:bi, classorid:`${classorid}`, type:'id'});
                    localStorage.setItem("FR_REMIX_LIST", JSON.stringify(FR_REMIX_LIST));
                    console.log(localStorage.getItem("FR_REMIX_LIST"))
                }


            }

            //  item.style.height = '50px';
            //  item.style.width = '235px';
            //  item.style.marginTop = '10px';
            //  item.style.marginBottom = '10px';
            //  item.style.border = '1px solid #DDE0EB';
            //  item.appendChild(bi);
            //  list.appendChild(item);


        },
        remixCallback:function(obj) {
           
        },
        RemixJS:function(json, callback) {
            let FR_REMIX_LIST = [];
            // let FR_REMIX_LIST = JSON.parse(localStorage.getItem("FR_REMIX_LIST"));
            //     if(FR_REMIX_LIST === null) {
                  
            //     } else {
            //         FR_REMIX_LIST = JSON.parse(localStorage.getItem("FR_REMIX_LIST"));
            //     }
            let obj = JSON.parse(json);
          
            for(let i = 0; i < obj.length; i++) {
                //push into FRREMIX


                FR_REMIX_LIST.push({id:obj[i].id, image:obj[i].url, type:'url'});

                    localStorage.setItem("FR_REMIX_LIST", JSON.stringify(FR_REMIX_LIST));
                    
            }
            
            this.remixCallback = callback;

        },
        menu() {

        },
        GUI:function(obj) {
            parent.datGUI(obj);
        },
        replaceString:function(searchString, replaceWith) {
           
            let str = JSON.parse(localStorage.getItem("dhtml")).js;
            str = str.replace('<script>','');
            str = str.replace(searchString, replaceWith);
            parent.window.updateJSCode(str);
        },
        SaveScreenShot(callback) {
            alert('save screen shot called')
            html2canvas(document.body,{allowTaint:true, removeContainer:false}).then(function(canvas) {          
                
                var extra_canvas = document.createElement("canvas");
                extra_canvas.setAttribute('width',canvas.width/4);
                extra_canvas.setAttribute('height',canvas.height/4);
                var ctx = extra_canvas.getContext('2d');
                ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,canvas.width/4,canvas.height/4);
                var dataURL = extra_canvas.toDataURL('image/jpeg', 0.8);
                
                localStorage.setItem("thumbnail", dataURL); 
                callback();
           });
        },
        RemixText:function(elId, options) {

            this.elId = elId;
            let FR_REMIX_LIST = JSON.parse(localStorage.getItem("FR_REMIX_LIST"));
            let FR_REMIX_LIST2 = [];
            if(FR_REMIX_LIST === null) {
                FR_REMIX_LIST = [];
            } else {
                FR_REMIX_LIST = JSON.parse(localStorage.getItem("FR_REMIX_LIST"));
            }

            let list = parent.document.getElementById('main-menu');
            let item = parent.document.createElement('li');
            let classorid = flowroom.elId.substring(1);


            if(this.elId.charAt(0) === '.') {

                let classorid = flowroom.elId.substring(1);
                classorid = classorid.toString();
                var textEdit = document.getElementsByClassName(`${classorid}`)[0];

                if(textEdit === 'textarea') {
                    textEdit = document.getElementsByClassName(`${classorid}`)[0].value;
                } else if(textEdit === 'input') {
                    textEdit = document.getElementsByClassName(`${classorid}`)[0].value;
                } else {
                    textEdit = document.getElementsByClassName(`${classorid}`)[0].innerText;
                }
                // Display the url to the user
                if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(1)) === -1) { /*if at least one array item with that name of class or id without # or . then*/
                    let bgImg = document.createElement('div');
                    let text = document.createElement('p');
                    let overlay = document.createElement('div');
                    let descriptionBox = document.createElement('div');
                    descriptionBox.appendChild(document.createTextNode(options.description));
                    let singleLine = document.createElement('input');
                    let multiLine = document.createElement('textarea');
                    let tagType = document.getElementsByClassName(classorid)[0].tagName;
                    if(tagType === 'textarea') {
                        singleLine.value = document.getElementsByClassName(classorid)[0].value;
                    } else if(tagType === 'input') {
                        singleLine.value = document.getElementsByClassName(classorid)[0].value;
                    } else {
                        singleLine.value = document.getElementsByClassName(classorid)[0].innerText;
                    }
                    if(tagType === 'textarea') {
                        multiLine.value = document.getElementsByClassName(classorid)[0].value;
                    } else if(tagType === 'input') {
                        multiLine.value = document.getElementsByClassName(classorid)[0].value;
                    } else {
                        multiLine.value = document.getElementsByClassName(classorid)[0].innerText;
                    }
                    let beforeT;
                    if(tagType === 'textarea') {
                     beforeT = document.getElementsByClassName(classorid)[0].value;
                    } else if(tagType === 'input') {
                     beforeT = document.getElementsByClassName(classorid)[0].value;
                    } else {
                     beforeT = document.getElementsByClassName(classorid)[0].innerText;
                    }
                    if(tagType === 'textarea') {
                     beforeT = document.getElementsByClassName(classorid)[0].value;
                    } else if(tagType === 'input') {
                     beforeT = document.getElementsByClassName(classorid)[0].value;
                    } else {
                     beforeT = document.getElementsByClassName(classorid)[0].innerText;
                    }
                    if(options.multiline === false) {
                        singleLine.setAttribute("type", "text");
                        singleLine.setAttribute("id", "singleLine");
                        singleLine.style.marginTop = '10px';
                        singleLine.style.width = '230px';
                        singleLine.style.height = '40px';
                        singleLine.style.padding = '10px';
                        singleLine.addEventListener('input', ()=>{
                            parent.window.calledAlready(false);
                        })

                    } else {
                        multiLine.style.marginTop = '10px';
                        multiLine.style.width = '230px';
                        multiLine.style.height = '80px';
                        multiLine.style.resize = 'none';
                        multiLine.style.padding = '10px';
                        multiLine.addEventListener('input', ()=>{
                            parent.window.calledAlready(false);
                        });//change this

                    }

                    descriptionBox.setAttribute = ("contentEditable");
                    descriptionBox.style.height = '100px';
                    descriptionBox.style.width = '230px';
                    descriptionBox.style.overflowY = 'scroll';
                    descriptionBox.style.marginTop = '10px';
                    descriptionBox.style.backgroundColor = '#EFEFEF';
                    descriptionBox.style.padding = '10px';
                    text.appendChild(document.createTextNode(`${textEdit}`))
                    item.style.height = '50px';
                    item.style.width = '348px';
                    item.style.marginTop = '10px';
                    item.style.marginBottom = '10px';
                    item.style.marginLeft = 'auto';
                    item.style.marginRight = 'auto';
                    item.style.border = '1px solid #DDE0EB';
                    item.style.display = 'flex';
                    item.style.alignItems = 'center';
                    bgImg.style.marginRight = '5px';
                    bgImg.style.position = 'relative';
                    item.style.display = 'flex';
                    item.style.justifyContent = 'center';
                    item.style.paddingLeft = '10px';
                    item.style.paddingRight = '10px';
                    bgImg.style.right = '0px';
                    text.style.whiteSpace = 'nowrap';
                    text.style.overflow ='hidden';
                    text.style.textOverflow = 'ellipsis';

                    item.appendChild(text);
                    let secondCreated = false;
                    item.addEventListener('click', function() {
                        //alert(classorid);
                        if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(1)) !== -1) {

                        overlay.style.position = 'absolute';
                        overlay.style.zIndex = '1';
                        overlay.style.height = '100%';
                        overlay.style.width = '100%';
                        overlay.style.backgroundColor = 'white';
                        overlay.style.visibility = 'visible';

                        overlay.style.alignItems = 'center';
                        overlay.style.display = 'flex';
                        overlay.style.flexDirection = 'column';

                        let oside = parent.document.getElementById('main-menu');

                        oside.appendChild(overlay);

                        let head = document.createElement('div');
                        let headText = document.createElement('p');
                        let iconContainer = document.createElement('div');
                        let descriptionText = document.createElement('p');
                        let saveBTN = document.createElement('div');
                        saveBTN.style.height = '30px';
                        saveBTN.style.width = '150px';
                        saveBTN.style.border = '1px solid black';
                        saveBTN.style.borderRadius = '6px';
                        saveBTN.style.marginTop = '10px';
                        saveBTN.appendChild(document.createTextNode('SAVE'));
                        saveBTN.style.display = 'flex';
                        saveBTN.style.justifyContent = 'center';
                        saveBTN.style.alignItems = 'center';
                        saveBTN.addEventListener('click', ()=> {
                            let beforeT;
                            if(tagType === 'textarea') {
                             beforeT = document.getElementsByClassName(classorid)[0].value;
                            } else if(tagType === 'input') {
                             beforeT = document.getElementsByClassName(classorid)[0].value;
                            } else {
                             beforeT = document.getElementsByClassName(classorid)[0].innerText;
                            }

                            if(tagType === 'textarea') {
                             beforeT = document.getElementsByClassName(classorid)[0].value;
                            } else if(tagType === 'input') {
                             beforeT = document.getElementsByClassName(classorid)[0].value;
                            } else {
                             beforeT = document.getElementsByClassName(classorid)[0].innerText;
                            }
                           let text = document.getElementsByClassName(classorid)[0].innerText = singleLine.value;
                        //    parent.window.callUpdate(beforeT, text);
                        //    parent.window.calledAlready(true);

                              document.getElementsByClassName(elId)[0].style.innerText = text;
                        });
                        descriptionText.appendChild(document.createTextNode('Description'));
                        let descriptionTextWrap = document.createElement('div');
                        descriptionTextWrap.appendChild(descriptionText);
                        descriptionTextWrap.style.display = 'flex';
                        descriptionTextWrap.style.justifyContent = 'flex-start';

                        descriptionTextWrap.style.padding = '10px';
                        descriptionTextWrap.style.wordBreak = 'break-all';
                        descriptionTextWrap.appendChild(descriptionText);
                        descriptionTextWrap.style.width = '100%';
                        iconContainer.style.border = '1px solid black';
                        iconContainer.style.height = '30px';
                        iconContainer.style.width = '30px';
                        iconContainer.style.display = 'flex';
                        iconContainer.style.justifyContent = 'center';
                        iconContainer.style.alignItems = 'center';
                        iconContainer.style.left = '-45px';
                        iconContainer.style.position = 'relative';
                        iconContainer.style.marginBottom = '10px';

                        headText.style.marginRight = '20px';
                        let icon = document.createElement('div');
                        icon.className = 'fa fa-angle-left';
                        icon.fontSize = '40px';
                        head.style.height = '35px';
                            head.style.width = '100%';
                            head.style.borderBottom = '1px solid #DDE0EB';
                        let overlaySide;
                        if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(1)) !== -1) {

                            if(FR_REMIX_LIST2.indexOf(flowroom.elId.substring(1)) === -1) {
                            headText.appendChild(document.createTextNode('CHANGE TEXT'))

                            head.style.display = 'flex';
                            head.style.justifyContent = 'center';
                            head.style.alignItems = 'center';

                            head.appendChild(iconContainer);
                            iconContainer.appendChild(icon);
                            head.appendChild(headText);

                            head.setAttribute("id", "remixhead2");
                            overlay.appendChild(head);

                            overlay.appendChild(descriptionTextWrap);
                            overlay.appendChild(descriptionBox);
                            if(options.multiline === false) {
                                overlay.appendChild(singleLine);
                            } else {
                                overlay.appendChild(multiLine);

                            }

                            overlay.appendChild(saveBTN);

                            FR_REMIX_LIST2.push(flowroom.elId.substring(1))

                            iconContainer.addEventListener('click', function(){
                                //overlay.style.visibility = 'hidden';

                                oside.removeChild(overlay);


                            })
                            localStorage.setItem("remixhead2", true);
                            secondCreated = true;

                            }

                        }


                        } else {
                            //overlay.style.visibility = 'visible';
                        }
                    })

                    //item.appendChild(bgImg);
                    list.appendChild(item);

                    FR_REMIX_LIST.push(classorid);
                    localStorage.setItem("FR_REMIX_LIST", JSON.stringify(FR_REMIX_LIST));

                }


        } else if(this.elId.charAt(0) === '#') {
            let classorid = flowroom.elId.substring(1);
            classorid = classorid.toString();
            var textEdit = document.getElementById(`${classorid}`);
            if(textEdit  === 'textarea') {
                textEdit = document.getElementById(`${classorid}`).value;
            } else if(textEdit === 'input') {
                textEdit = document.getElementById(`${classorid}`).value;
            } else {
                textEdit = document.getElementById(`${classorid}`).innerText;
            }
            // Display the url to the user
            if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(1)) === -1) { /*if at least one array item with that name of class or id without # or . then*/
                let bgImg = document.createElement('div');
                let text = document.createElement('p');
                let overlay = document.createElement('div');
                let descriptionBox = document.createElement('div');
                descriptionBox.appendChild(document.createTextNode(options.description));
                let singleLine = document.createElement('input');
                let multiLine = document.createElement('textarea');
                let tagType = document.getElementById(classorid).tagName;
                if(tagType === 'textarea') {
                    singleLine.value = document.getElementById(classorid).value;
                } else if(tagType === 'input') {
                    singleLine.value = document.getElementById(classorid).value;
                } else {
                    singleLine.value = document.getElementById(classorid).innerHTML;
                }
                if(tagType === 'textarea') {
                    multiLine.value = document.getElementById(classorid).value;
                } else if(tagType === 'input') {
                    multiLine.value = document.getElementById(classorid).value;
                } else {
                    multiLine.value = document.getElementById(classorid).innerHTML;
                }
                let beforeT;
                if(tagType === 'textarea') {
                 beforeT = document.getElementById(classorid).value;
                } else if(tagType === 'input') {
                 beforeT = document.getElementById(classorid).value;
                } else {
                 beforeT = document.getElementById(classorid).innerText;
                }
                if(tagType === 'textarea') {
                 beforeT = document.getElementById(classorid).value;
                } else if(tagType === 'input') {
                 beforeT = document.getElementById(classorid).value;
                } else {
                 beforeT = document.getElementById(classorid).innerText;
                }
                if(options.multiline === false) {
                    singleLine.setAttribute("type", "text");
                    singleLine.setAttribute("id", "singleLine");
                    singleLine.style.marginTop = '10px';
                    singleLine.style.width = '230px';
                    singleLine.style.height = '40px';
                    singleLine.style.padding = '10px';
                    singleLine.addEventListener('input', ()=>{
                        //parent.window.calledAlready(false);
                    })

                } else {
                    multiLine.style.marginTop = '10px';
                    multiLine.style.width = '230px';
                    multiLine.style.height = '80px';
                    multiLine.style.resize = 'none';
                    multiLine.style.padding = '10px';
                    multiLine.addEventListener('input', ()=>{
                        //parent.window.calledAlready(false);
                    });//change this

                }

                descriptionBox.setAttribute = ("contentEditable");
                descriptionBox.style.height = '100px';
                descriptionBox.style.width = '230px';
                descriptionBox.style.overflowY = 'scroll';
                descriptionBox.style.marginTop = '10px';
                descriptionBox.style.backgroundColor = '#EFEFEF';
                descriptionBox.style.padding = '10px';
                text.appendChild(document.createTextNode(`${textEdit}`))
                item.style.height = '50px';
                item.style.width = '348px';
                item.style.marginTop = '10px';
                item.style.marginBottom = '10px';
                item.style.marginLeft = 'auto';
                item.style.marginRight = 'auto';
                item.style.border = '1px solid #DDE0EB';
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.borderRadius = '5px';
                bgImg.style.marginRight = '5px';
                bgImg.style.position = 'relative';
                item.style.display = 'flex';
                item.style.justifyContent = 'center';
                item.style.paddingLeft = '10px';
                item.style.paddingRight = '10px';
                bgImg.style.right = '0px';
                text.style.whiteSpace = 'nowrap';
                text.style.overflow ='hidden';
                text.style.textOverflow = 'ellipsis';

                item.appendChild(text);
                let secondCreated = false;
                item.addEventListener('click', function() {
                    //alert(classorid);
                    if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(1)) !== -1) {

                    overlay.style.position = 'absolute';
                    overlay.style.zIndex = '1';
                    overlay.style.height = '100%';
                    overlay.style.width = '384px';
                    overlay.style.backgroundColor = 'white';
                    overlay.style.visibility = 'visible';

                    overlay.style.alignItems = 'center';
                    overlay.style.display = 'flex';
                    overlay.style.flexDirection = 'column';

                    let oside = parent.document.getElementById('main-menu');

                    oside.appendChild(overlay);

                    let head = document.createElement('div');
                    let headText = document.createElement('p');
                    let iconContainer = document.createElement('div');
                    let descriptionText = document.createElement('p');
                    let saveBTN = document.createElement('div');
                    saveBTN.style.height = '30px';
                    saveBTN.style.width = '150px';
                    saveBTN.style.border = '1px solid black';
                    saveBTN.style.borderRadius = '6px';
                    saveBTN.style.marginTop = '10px';
                    saveBTN.appendChild(document.createTextNode('SAVE'));
                    saveBTN.style.display = 'flex';
                    saveBTN.style.justifyContent = 'center';
                    saveBTN.style.alignItems = 'center';
                    saveBTN.addEventListener('click', ()=> {
                        let beforeT;
                        if(tagType === 'textarea') {
                         beforeT = document.getElementById(classorid).value;
                        } else if(tagType === 'input') {
                         beforeT = document.getElementById(classorid).value;
                        } else {
                         beforeT = document.getElementById(classorid).innerText;
                        }

                        if(tagType === 'textarea') {
                         beforeT = document.getElementById(classorid).value;
                        } else if(tagType === 'input') {
                         beforeT = document.getElementById(classorid).value;
                        } else {
                         beforeT = document.getElementById(classorid).innerText;
                        }
                       let text = document.getElementById(classorid).innerText = singleLine.value;
                    //    parent.window.callUpdate(beforeT, text);
                    //    parent.window.calledAlready(true);

                          document.getElementById(elId).style.innerText = text;
                    });
                    descriptionText.appendChild(document.createTextNode('Description'));
                    let descriptionTextWrap = document.createElement('div');
                    descriptionTextWrap.appendChild(descriptionText);
                    descriptionTextWrap.style.display = 'flex';
                    descriptionTextWrap.style.justifyContent = 'flex-start';

                    descriptionTextWrap.style.padding = '10px';
                    descriptionTextWrap.style.wordBreak = 'break-all';
                    descriptionTextWrap.appendChild(descriptionText);
                    descriptionTextWrap.style.width = '100%';
                    iconContainer.style.border = '1px solid black';
                    iconContainer.style.height = '30px';
                    iconContainer.style.width = '30px';
                    iconContainer.style.display = 'flex';
                    iconContainer.style.justifyContent = 'center';
                    iconContainer.style.alignItems = 'center';
                    iconContainer.style.left = '-45px';
                    iconContainer.style.position = 'relative';
                    iconContainer.style.marginBottom = '10px';

                    headText.style.marginRight = '20px';
                    let icon = document.createElement('div');
                    icon.className = 'fa fa-angle-left';
                    icon.fontSize = '40px';
                    head.style.height = '35px';
                        head.style.width = '100%';
                        head.style.borderBottom = '1px solid #DDE0EB';
                    let overlaySide;
                    if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(1)) !== -1) {

                        if(FR_REMIX_LIST2.indexOf(flowroom.elId.substring(1)) === -1) {
                        headText.appendChild(document.createTextNode('CHANGE TEXT'))

                        head.style.display = 'flex';
                        head.style.justifyContent = 'center';
                        head.style.alignItems = 'center';

                        head.appendChild(iconContainer);
                        iconContainer.appendChild(icon);
                        head.appendChild(headText);

                        head.setAttribute("id", "remixhead2");
                        overlay.appendChild(head);

                        overlay.appendChild(descriptionTextWrap);
                        overlay.appendChild(descriptionBox);
                        if(options.multiline === false) {
                            overlay.appendChild(singleLine);
                        } else {
                            overlay.appendChild(multiLine);

                        }

                        overlay.appendChild(saveBTN);

                        FR_REMIX_LIST2.push(flowroom.elId.substring(1))

                        iconContainer.addEventListener('click', function(){
                            //overlay.style.visibility = 'hidden';

                            oside.removeChild(overlay);


                        })
                        localStorage.setItem("remixhead2", true);
                        secondCreated = true;

                        }

                    }


                    } else {
                        //overlay.style.visibility = 'visible';
                    }
                })

                //item.appendChild(bgImg);
                list.appendChild(item);

                FR_REMIX_LIST.push({classorid:classorid,image:bi});
                localStorage.setItem("FR_REMIX_LIST", JSON.stringify(FR_REMIX_LIST));

            }


        } else {
            let classorid = flowroom.elId.substring(0);
            classorid = classorid.toString();
            var textEdit = document.getElementsByTagName(`${classorid}`)[0];
            if(textEdit  === 'textarea') {
                textEdit = document.getElementsByTagName(`${classorid}`)[0].value;
            } else if(textEdit === 'input') {
                textEdit = document.getElementsByTagName(`${classorid}`)[0].value;
            } else {
                textEdit = document.getElementsByTagName(`${classorid}`)[0].innerText;
            }
            // Display the url to the user
            if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(0)) === -1) { /*if at least one array item with that name of class or id without # or . then*/
                let bgImg = document.createElement('div');
                let text = document.createElement('p');
                let overlay = document.createElement('div');
                let descriptionBox = document.createElement('div');
                descriptionBox.appendChild(document.createTextNode(options.description));
                let singleLine = document.createElement('input');
                let multiLine = document.createElement('textarea');
                let tagType = document.getElementsByTagName(classorid)[0].tagName;
                if(tagType === 'textarea') {
                    singleLine.value = document.getElementsByTagName(classorid)[0].value;
                } else if(tagType === 'input') {
                    singleLine.value = document.getElementsByTagName(classorid)[0].value;
                } else {
                    singleLine.value = document.getElementsByTagName(classorid)[0].innerText;
                }
                if(tagType === 'textarea') {
                    multiLine.value = document.getElementsByTagName(classorid)[0].value;
                } else if(tagType === 'input') {
                    multiLine.value = document.getElementsByTagName(classorid)[0].value;
                } else {
                    multiLine.value = document.getElementsByTagName(classorid)[0].innerText;
                }
                let beforeT;
                if(tagType === 'textarea') {
                 beforeT = document.getElementsByTagName(classorid)[0].value;
                } else if(tagType === 'input') {
                 beforeT = document.getElementsByTagName(classorid)[0].value;
                } else {
                 beforeT = document.getElementsByTagName(classorid)[0].innerText;
                }
                if(tagType === 'textarea') {
                 beforeT = document.getElementsByTagName(classorid)[0].value;
                } else if(tagType === 'input') {
                 beforeT = document.getElementsByTagName(classorid)[0].value;
                } else {
                 beforeT = document.getElementsByTagName(classorid)[0].innerText;
                }
                if(options.multiline === false) {
                    singleLine.setAttribute("type", "text");
                    singleLine.setAttribute("id", "singleLine");
                    singleLine.style.marginTop = '10px';
                    singleLine.style.width = '230px';
                    singleLine.style.height = '40px';
                    singleLine.style.padding = '10px';
                    singleLine.addEventListener('input', ()=>{
                        parent.window.calledAlready(false);
                    })

                } else {
                    multiLine.style.marginTop = '10px';
                    multiLine.style.width = '230px';
                    multiLine.style.height = '80px';
                    multiLine.style.resize = 'none';
                    multiLine.style.padding = '10px';
                    multiLine.addEventListener('input', ()=>{
                        parent.window.calledAlready(false);
                    });//change this

                }

                descriptionBox.setAttribute = ("contentEditable");
                descriptionBox.style.height = '100px';
                descriptionBox.style.width = '230px';
                descriptionBox.style.overflowY = 'scroll';
                descriptionBox.style.marginTop = '10px';
                descriptionBox.style.backgroundColor = '#EFEFEF';
                descriptionBox.style.padding = '10px';
                text.appendChild(document.createTextNode(`${textEdit}`))
                item.style.height = '50px';
                item.style.width = '100%';
                item.style.marginTop = '10px';
                item.style.marginBottom = '10px';
                item.style.border = '1px solid #DDE0EB';
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                bgImg.style.marginRight = '5px';
                bgImg.style.position = 'relative';
                item.style.display = 'flex';
                item.style.justifyContent = 'center';
                item.style.paddingLeft = '10px';
                item.style.paddingRight = '10px';
                bgImg.style.right = '0px';
                text.style.whiteSpace = 'nowrap';
                text.style.overflow ='hidden';
                text.style.textOverflow = 'ellipsis';

                item.appendChild(text);
                let secondCreated = false;
                item.addEventListener('click', function() {
                    //alert(classorid);
                    if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(0)) !== -1) {

                    overlay.style.position = 'absolute';
                    overlay.style.zIndex = '1';
                    overlay.style.height = '100%';
                    overlay.style.width = '384px';
                    overlay.style.backgroundColor = 'white';
                    overlay.style.visibility = 'visible';

                    overlay.style.alignItems = 'center';
                    overlay.style.display = 'flex';
                    overlay.style.flexDirection = 'column';

                    let oside = parent.document.getElementById('main-menu');

                    oside.appendChild(overlay);

                    let head = document.createElement('div');
                    let headText = document.createElement('p');
                    let iconContainer = document.createElement('div');
                    let descriptionText = document.createElement('p');
                    let saveBTN = document.createElement('div');
                    saveBTN.style.height = '30px';
                    saveBTN.style.width = '150px';
                    saveBTN.style.border = '1px solid black';
                    saveBTN.style.borderRadius = '6px';
                    saveBTN.style.marginTop = '10px';
                    saveBTN.appendChild(document.createTextNode('SAVE'));
                    saveBTN.style.display = 'flex';
                    saveBTN.style.justifyContent = 'center';
                    saveBTN.style.alignItems = 'center';
                    saveBTN.addEventListener('click', ()=> {
                        let beforeT;
                        if(tagType === 'textarea') {
                         beforeT = document.getElementsByTagName(classorid)[0].value;
                        } else if(tagType === 'input') {
                         beforeT = document.getElementsByTagName(classorid)[0].value;
                        } else {
                         beforeT = document.getElementsByTagName(classorid)[0].innerText;
                        }

                        if(tagType === 'textarea') {
                         beforeT = document.getElementsByTagName(classorid)[0].value;
                        } else if(tagType === 'input') {
                         beforeT = document.getElementsByTagName(classorid)[0].value;
                        } else {
                         beforeT = document.getElementsByTagName(classorid)[0].innerText;
                        }
                       let text = document.getElementsByTagName(classorid)[0].innerText = singleLine.value;
                       parent.window.callUpdate(beforeT, text);
                       parent.window.calledAlready(true);
                    });
                    descriptionText.appendChild(document.createTextNode('Description'));
                    let descriptionTextWrap = document.createElement('div');
                    descriptionTextWrap.appendChild(descriptionText);
                    descriptionTextWrap.style.display = 'flex';
                    descriptionTextWrap.style.justifyContent = 'flex-start';

                    descriptionTextWrap.style.padding = '10px';
                    descriptionTextWrap.style.wordBreak = 'break-all';
                    descriptionTextWrap.appendChild(descriptionText);
                    descriptionTextWrap.style.width = '100%';
                    iconContainer.style.border = '1px solid black';
                    iconContainer.style.height = '30px';
                    iconContainer.style.width = '30px';
                    iconContainer.style.display = 'flex';
                    iconContainer.style.justifyContent = 'center';
                    iconContainer.style.alignItems = 'center';
                    iconContainer.style.left = '-45px';
                    iconContainer.style.position = 'relative';
                    iconContainer.style.marginBottom = '10px';

                    headText.style.marginRight = '20px';
                    let icon = document.createElement('div');
                    icon.className = 'fa fa-angle-left';
                    icon.fontSize = '40px';
                    head.style.height = '35px';
                        head.style.width = '100%';
                        head.style.borderBottom = '1px solid #DDE0EB';
                    let overlaySide;
                    if(FR_REMIX_LIST.indexOf(flowroom.elId.substring(0)) !== -1) {

                        if(FR_REMIX_LIST2.indexOf(flowroom.elId.substring(0)) === -1) {
                        headText.appendChild(document.createTextNode('CHANGE TEXT'))

                        head.style.display = 'flex';
                        head.style.justifyContent = 'center';
                        head.style.alignItems = 'center';

                        head.appendChild(iconContainer);
                        iconContainer.appendChild(icon);
                        head.appendChild(headText);

                        head.setAttribute("id", "remixhead2");
                        overlay.appendChild(head);

                        overlay.appendChild(descriptionTextWrap);
                        overlay.appendChild(descriptionBox);
                        if(options.multiline === false) {
                            overlay.appendChild(singleLine);
                        } else {
                            overlay.appendChild(multiLine);

                        }

                        overlay.appendChild(saveBTN);

                        FR_REMIX_LIST2.push(flowroom.elId.substring(0))

                        iconContainer.addEventListener('click', function(){
                            //overlay.style.visibility = 'hidden';

                            oside.removeChild(overlay);


                        })
                        localStorage.setItem("remixhead2", true);
                        secondCreated = true;

                        }

                    }


                    } else {
                        //overlay.style.visibility = 'visible';
                    }
                })

                //item.appendChild(bgImg);
                list.appendChild(item);

                FR_REMIX_LIST.push(classorid);
                localStorage.setItem("FR_REMIX_LIST", JSON.stringify(FR_REMIX_LIST));

            }


        }

        //  item.style.height = '50px';
        //  item.style.width = '235px';
        //  item.style.marginTop = '10px';
        //  item.style.marginBottom = '10px';
        //  item.style.border = '1px solid #DDE0EB';
        //  item.appendChild(bi);
        //  list.appendChild(item);

    },

    remix(){
        //parent
    }




    }



    //if(typeof(flowroom) === 'undefined') {
        window.flowroom = flowroom;
        //alert('ff')
    // } else {
    //     alert('xs')
    // }
})(window)
