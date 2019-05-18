(function(window) {
    'use strict'

  
    let SaveThumb = {
        SaveScreenShot(callback) {
            let html = document.body;
            let bodyBackgroundColor = document.body.style.backgroundColor;
            if(bodyBackgroundColor !== undefined) {
                document.body.style.backgroundColor = 'black';
            } 
            let arrayHTML = document.getElementsByTagName('canvas');
            if(arrayHTML.length > 0) {
                //alert('no canvas');
                html = arrayHTML[0];
            } 
            html2canvas(html,{ allowTaint:true, removeContainer:false}).then(function(canvas) {          
                
                var extra_canvas = document.createElement("canvas");
                extra_canvas.setAttribute('width',canvas.width/4);
                extra_canvas.setAttribute('height',canvas.height/4);
                var ctx = extra_canvas.getContext('2d');
                ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,canvas.width/4,canvas.height/4);
                var dataURL = extra_canvas.toDataURL('image/jpeg', 0.8);
                if(bodyBackgroundColor !== undefined) {
                    document.body.style.backgroundColor = bodyBackgroundColor;
                } 
                localStorage.setItem("thumbnail", dataURL); 
                callback();
           });

        }
      
    }



    //if(typeof(flowroom) === 'undefined') {
        window.SaveThumb = SaveThumb;
        //alert('ff')
    // } else {
    //     alert('xs')
    // }
})(window)
