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
        componentDidMount() {
                let carousel = document.getElementById('carousel-tags')
                let tags = ['Apps','Interactive Memes','Games','Text Effects','Video Effects'];
            
                 carousel.innerHTML = '';
                      let tagWrap = document.createElement('div')
                      tagWrap.setAttribute("id", "create-tags")
                      
                      for(let i =0; i < tags.length; i++) {
                        let tag = document.createElement('div');
                        let p = document.createElement('p');
                        tag.style.border = '2px solid #40FFE8';
                        tag.style.borderRadius = '23px';
                        tag.style.paddingTop = '3px';
                        tag.style.paddingBottom = '5px'
                        tag.style.paddingLeft = '15px';
                        tag.style.paddingRight = '15px';
                        tag.style.marginRight = '20px';
                        tag.style.height = '36px';
                        p.appendChild(document.createTextNode(`${tags[i]}`));
                        p.style.color = '#40FFE8'
                        p.style.fontWeight = 'bold';
                        p.style.fontSize = '16px';
                        p.style.whiteSpace = 'nowrap';
                        tag.appendChild(p);
                        tag.style.display = 'flex';
                        tag.style.alignItems = 'center';
                        tag.style.justifyContent = 'center';
                        
                        tagWrap.style.position = 'absolute';
                        tagWrap.style.overflowX = 'scroll';
                        tagWrap.appendChild(tag);
                        tagWrap.style.marginTop = '10px';
                        tagWrap.style.zIndex = 999;
                        carousel.appendChild(tagWrap)
                      }
         
        }
        render() {
                return  (
                        <div style={{flex:1,display:'flex',
                                flexDirection:'column',background:'#151515'}}>
                         <div id="carousel-tags"  style={{position:'relative',top:'30px',width:'100%',display:this.props.display,overflowX:'scroll',height:50,top:49,background:'#151515'}}>
                                
                        </div>
                        </div>
                )

        }
       
 }


  
export default Carousel;