function testFR (elementID, url) {
     var file, fr, img, dkrm;
     let imageFromCanvas;
//(function() {
    let inputEL = document.createElement("input");
    inputEL.setAttribute('type', 'file');
    inputEL.setAttribute('id', 'img-file');
    inputEL.style.display ='none';
    document.body.appendChild(inputEL);   
    document.getElementById('myModal').style.display = 'block';

const targetElement = document.querySelector("#myModal");
 
// 2. ...in some event handler after showing the target element...disable body scroll
bodyScrollLock.disableBodyScroll(targetElement);

    document.getElementById('scream').style.display = 'none';
    //document.getElementById('a').style.display = 'none';
   
       
                 // you need to create an input element in HTML, explained later
                 
            let input = document.getElementById('img-file');

                 input.addEventListener('change', function() {
                     var loadedImage = input.files[0];
                     alert(loadedImage)
                     //config['Image Path'] = file.name;
                     // update all controllers
                     //document.getElementById('pic').style.backgroundImage = `url(${img})`;
                     loadImage();

                   

                     function loadImage() {
                       
                
                        if (typeof window.FileReader !== 'function') {
                            write("The file API isn't supported on this browser yet.");
                            return;
                        }
                
                        
                        if (!input) {
                            write("Um, couldn't find the imgfile element.");
                        }
                        else if (!input.files) {
                            write("This browser doesn't seem to support the `files` property of file inputs.");
                        }
                        else if (!input.files[0]) {
                            write("Please select a file before clicking 'Load'");
                        }
                        else {
                            file = loadedImage;
                            fr = new FileReader();
                            fr.onload = createImage;
                            fr.readAsDataURL(file);
                        }
                
                        function createImage() {
                            img = new Image();
                            img.onload = imageLoaded;
                            img.src = fr.result;
                        }
                
                        function imageLoaded() {
                            document.getElementById('scream').src = fr.result;
                            document.getElementById('scream').style.display = 'none';
                            //let fcanvas = document.getElementById('result-canvas');
                                dkrm = new Darkroom('#scream', {
                                    minWidth: 100,
                                    minHeight: 100,
                                    maxWidth: 200,
                                    maxHeight: 200,
                                plugins:{
                                    save: { callback: function() {
                                        this.darkroom.selfDestroy(); // Cleanup
                                        var newImage = dkrm.canvas.toDataURL();
                                        fileStorageLocation = newImage;
                                        document.getElementById('drag-here').style.display = 'none';
                                        //document.getElementById('scream').src = canvas.toDataURL("image/png");
                                        theApp(fileStorageLocation);
                                    
                                      }
                                    }
                                }
                            });
                           
                        }
                
                        function write(msg) {
                            var p = document.createElement('p');
                            p.innerHTML = msg;
                            document.body.appendChild(p);
                        }
                    }
           
                     console.log(file);


                     
 
                    //  for (var i in gui.__controllers) {
                    //      gui.__controllers[i].updateDisplay();
                    //  }
                 });
                 //input.click(); 
             
       
 function theApp(image) {
    let canvasff = document.getElementById('final-result-canvas');
    document.getElementById('scream').style.display = 'none';
    var toBase64Btn = document.getElementById("toBase64");
    var ctx = canvasff.getContext("2d");
    canvasff.width = dkrm.canvas.width + 50;
    canvasff.height = dkrm.canvas.height + 50;
    
    var imgTile = new Image();
imgTile.src = image;
imgTile.height = dkrm.canvas.height;
imgTile.width = dkrm.canvas.width;
imgTile.onload = function() {
   ctx.drawImage(imgTile, 25, 25);
   document.querySelector('img').style.display = 'none';
   document.getElementById('final-result-canvas').style.display = 'block';

}
            //ctx.drawImage(image,0,0);
        
   
    

    var drawing = false;
    var drawingMode = "add";
    var pencilWidth = 25;
    var base64Str = "";
    var fabCan = new fabric.Canvas("b");
    var fillColor = "rgba(255,0,0,.5)";
    
    var getMouseCoordinate = function (evt) {
        return {
          x : evt.pageX - this.offsetLeft,
        y : evt.pageY - this.offsetTop
      };
    };
    
    canvasff.onmousedown = function (e) {
        if (drawing) return false;
      drawing = true;
      var mouse = getMouseCoordinate.call(this, e);
      
      ctx.globalCompositeOperation = drawingMode === "add" ? "xor" : "destination-out";
      ctx.fillStyle = drawingMode === "add" ? fillColor : "rgba(0,0,0,1)";
      
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, pencilWidth, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
    };
    
    canvasff.onmousemove = function (e) {
        if (!drawing) return false;
      var mouse = getMouseCoordinate.call(this, e);
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, pencilWidth, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
    };
    
    canvasff.onmouseup = function (e) {
        if (!drawing) return false;
      drawing = false;
      let finalImg = canvasff.toDataURL("image/png");
      document.getElementById('saveImg').addEventListener('click',()=>{
          //alert(imgTile.src)
       document.getElementById('brando').style.backgroundImage = `url(${finalImg})`;
   })
    };
    
    toBase64Btn.onclick = function () {
        if (drawing) return false;
      
      var img = document.createElement("img");
      
      img.onload = function () {
      
          var group = [];
      
          ctx.clearRect(0,0,canvasff.width, canvasff.height);
        fabCan.add(new fabric.Image(this));
        
        fabCan.getObjects().forEach(function (obj) {
            obj.globalCompositeOperation = "xor";
          group.push(obj);
        });
        
        fabCan.clear().add(new fabric.Group(group)).renderAll();
      };
      
      img.src = canvasff.toDataURL("image/png");
    };
   
    drawingMode =  "delete";
    fabCan.add(new fabric.Rect({
    width: 100,
    height: 100,
    fill: fillColor
    }));
    

 }
    
 //})();

    // var imgEl = document.getElementById("scream");
    // imgEl.setAttribute("src", "http://static1.purebreak.com/articles/3/16/45/93/@/645628-kim-kardashian-accusee-d-avoir-aminci-sa-diapo-2.jpg");
    // imgEl.setAttribute("height", "500px");
    // imgEl.setAttribute("width", "500px");

    
    // 
    // var canvas = document.getElementById("a");
    // var ctx = canvas.getContext("2d");
    // var imgg=document.getElementById("scream");
    // ctx.drawImage(imgEl,10,10);


}

