import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { firebase } from '.././firebase/firebase';

class Full extends Component {
  constructor() {
    super();
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
      let loaded = `<script>
        (function() {
          let frame = window.frameElement;
          if(frame === null) {
            return;
          } 
          let thumbnail = parent.document.getElementById('thumbnail_' + window.frameElement.id);
          if(thumbnail === null) {
            return;
          }
          thumbnail.style.display = 'none';
          
      })()
      </script>`;   
      let ref = firebase.database().ref("rooms").child(this.props.match.params.id);
      ref.once("value").then((snapshot) => {
        let prepareSource = () => {
          let html, css, js, src, script;
          if(snapshot.val() !== null) {
            html =  snapshot.val().html;
            css = snapshot.val().css;
            js = snapshot.val().js;

            let urlHTML = snapshot.val().urlHTML;
            let urlCSS = snapshot.val().urlCSS;
            let urlJS = snapshot.val().urlJS;
                
            if(urlHTML !== undefined && urlHTML !== '') {
              fetch(urlHTML).then((response)=> {
                if (!response.ok) {
                  return;
                }
                return response.text();
              }).then((data)=> {
                html = data;
                html = html === undefined || html === null ? '' : html;
         
                return fetch(urlCSS);
              }).then(function(response) {
                if (!response.ok) {
                  return;
                }
                return response.text();
              }).then(function(data){
                css = data;
                css = css === undefined || css === null ? '' : css;
              
                return fetch(urlJS);
              }).then(function(response){
                if (!response.ok) {
                  return;
                }
                return response.text();
              }).then(function(data){
                js = data;
                js = js === undefined || js === null ? '' : js; 
               
                script = "<script src='../flowroom.js'></script>";
                src = '';
                src = base_tpl.replace('</body>', html + '</body>');
                css = '<style>' + css + '</style>';
                src = src.replace('</head>', css + script + '</head>');
                js = '<script>' + js + '<\/script>';
                src = src.replace('</body>', js + loaded + '</body>');
                let frame = document;
                frame.open();
                frame.write(src);
                frame.close();
              });
              return '';
            } else {
              html = html === undefined || html === null ? '' : html;
              css = css === undefined || css === null ? '' : css;
              js = js === undefined || js === null ? '' : js; 
            }                 
          } else {
            html = '';
            css = '';
            js = '';
          }
          script = "<script src='../flowroom.js'></script>";
          src = '';
          src = base_tpl.replace('</body>', html + '</body>');
          css = '<style>' + css + '</style>';
          src = src.replace('</head>', css + script + '</head>');
          js = '<script>' + js + '<\/script>';
          src = src.replace('</body>', js + '</body>');
          return src;
        };
        let source = prepareSource();
        if(source !== '') {
          let frame = document;
          frame.open();
          frame.write(source);
          frame.close();
        }
        
      });
    }
    render() {
      return (
      <div>
      </div>
    )
  }
}

export default Full;
