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
      let ref = firebase.database().ref("rooms").child(this.props.match.params.id);
      ref.once("value").then((snapshot) => {
        let prepareSource = () => {
          let html, css, js, src, script;
          if(snapshot.val() !== null) {
            html =  snapshot.val().html;
            css = snapshot.val().css;
            js = snapshot.val().js;
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
        let frame = document;
        frame.open();
        frame.write(source);
        frame.close();
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
