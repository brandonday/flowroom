import React, { useState, useContext, useEffect } from 'react';
import { render } from "react-dom";
import {Rnd} from 'react-rnd';

const Box = () => (
  <div
    className="box"
    style={{ margin: 0, height: '100%', paddingBottom: '40px', width: 400}}
  >
    <article className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img src="https://avatars1.githubusercontent.com/u/10220449?v=3&s=460" draggable="false" alt="github avatar" />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>bokuweb</strong> <small>@bokuweb17</small> <small>31m</small>
            <br />
            Lorem .
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <a className="level-item">
              <span className="icon is-small"><i className="fa fa-reply" /></span>
            </a>
            <a className="level-item">
              <span className="icon is-small"><i className="fa fa-retweet" /></span>
            </a>
            <a className="level-item">
              <span className="icon is-small"><i className="fa fa-heart" /></span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
);


export default () => (
  <div
    style={{
      width: '400px',
      height: '400px',
      background:'blue'
    }}
    class="fuck"
  >
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 100,
        height: 190,
      }}
    
      bounds=".fuck"
    >
      <Box />
    </Rnd>
  </div>
);
