import React, { Component } from 'react';
import RoomPosts from './RoomPosts.js';
import Communities from './Communities.js';
import Footer from './Footer.js';
import AppModal from './AppModal';
import Create from './create';
import { firebase } from '../firebase/firebase';
import createHistory from 'history/createBrowserHistory';

let history = createHistory();

 class Carousel extends Component {
        constructor() {
                super();
        }
        componentDidMount(){
                 let tags = ['Apps','Interactive Memes',];
                 let carouselMobile = document.getElementById('carousel-tags-mobile');
  
                      let tagWrap = document.createElement('div')
                      tagWrap.setAttribute("id", "create-tags")
                      
                      for(let i =0; i < tags.length; i++) {
                        let tag = document.createElement('div');
                        let p = document.createElement('p');
                        tag.style.border = '0.5px solid #40FFE8';
                        tag.style.borderRadius = '23px';
                        tag.style.paddingTop = '3px';
                        tag.style.paddingBottom = '5px'
                        tag.style.paddingLeft = '15px';
                        tag.style.paddingRight = '15px';
                        tag.style.marginLeft = '20px';
                        p.appendChild(document.createTextNode(`${tags[i]}`));
                        p.style.color = '#40FFE8'
                        p.style.fontWeight = 'bold';
                        p.style.fontSize = '11px';
                        tag.appendChild(p);
                        tag.style.display = 'flex';
                        tag.style.alignItems = 'center';
                        tag.style.justifyContent = 'center';
                        
                        tagWrap.style.position = 'absolute';
                        tagWrap.appendChild(tag);
                        tagWrap.style.marginTop = '10px';
                        carouselMobile.appendChild(tagWrap)
                      }
        }
        render() {
                return  (
                        <div style={{flex:1,display:this.props.display,
                                flexDirection:'column',background:'#141414'}}>
                         <div id="carousel-tags-mobile" style={{position:'relative',top:'9px',width:'100%',display:this.props.display}}>
                                
                                </div>
                        </div>
                )

        }
       
 }


  
export default Carousel;