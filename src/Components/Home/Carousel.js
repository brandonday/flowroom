import React, { Component } from 'react';
import RoomPosts from './RoomPosts.js';
import Communities from './Communities.js';
import Footer from './Footer.js';
import AppModal from './AppModal';
import Create from './Create';
import { firebase } from '../firebase/firebase';
import createHistory from 'history/createBrowserHistory';
import M from 'materialize-css'
let history = createHistory();

 class Carousel extends Component {
        constructor() {
                super();
        }
        componentDidMount() {
             
                let data = [{
                        image:'https://media.giphy.com/media/QBdvVWhVUdxcVtPclE/giphy.gif',
                        title:'Birthday Card #1',
                        description:'This is a sample description',
                        price:'',
                        rating:4,
                        ageRating:'18+',
                        creatorAvatar:'',
                        creatorName:'',
                        shortID:'ersre#'
                      },
                      {image:'https://media.giphy.com/media/PjltqVavGSPKddcT21/giphy.gif',
                        title:'Video Slider',
                        description:'This is a sample description',
                        price:'',
                        rating:4,
                        ageRating:'18+',
                        creatorAvatar:'',
                        creatorName:'',
                        madeBy:''
                      },
                      {image:'https://media.giphy.com/media/j5nIN00OlCmZJYxAA1/giphy.gif',
                        title:'Remixable Kaleidoscope',
                        description:'This is a sample description',
                        price:'',
                        rating:4,
                        ageRating:'18+',
                        creatorAvatar:'',
                        creatorName:'',
                        madeBy:''
                      },
                      {image:'https://media.giphy.com/media/Idl9YGfhJ7uEQXBfCV/giphy.gif',
                      title:'Remixable Word guessing game',
                      description:'This is a sample description',
                      price:'',
                      rating:4,
                      ageRating:'18+',
                      creatorAvatar:'',
                      creatorName:'',
                      madeBy:'',
                      shortID:'edsds#'
                    },
                    {image:'https://media.giphy.com/media/dBaPQh3suuG0vgamIK/giphy.gif',
                    title:'Invadaz',
                    description:'This is a sample description',
                    price:'',
                    rating:4,
                    ageRating:'18+',
                    creatorAvatar:'',
                    creatorName:'',
                    madeBy:'',
                    shortID:'edsds#'
                  }
                ]
                      let carousel = document.getElementById('carousel-desktop');
                      
                      for(let i=0; i < data.length; i++) {
                        let card = document.createElement('div');
                        let cardItem = document.createElement('div');
                        let cardItemImage = document.createElement('div');
                        let cardItemInfo = document.createElement('div');
                        let cardItemTitle = document.createElement('p');
                        cardItemTitle.appendChild(document.createTextNode(data[i].title))
                        let cardItemDescription = document.createElement('p');
                        cardItemDescription.appendChild(document.createTextNode(data[i].description))
                
                        card.className = 'carousel-item-wrap';
                        cardItem.className = 'carousel-item carousel-item-c';
                        cardItemImage.className = 'carousel-item-image';
                        cardItemImage.style.backgroundImage =`url(${data[i].image})`;
                        cardItemImage.style.backgroundSize = 'cover';
                        cardItemImage.style.backgroundRepeat = 'no-repeat'
                        cardItemInfo.className = 'carousel-item-info';
                        cardItemTitle.className = 'carousel-item-title';
                        cardItemDescription.className = 'carousel-item-description'
                        
                        cardItem.appendChild(cardItemImage);
                        cardItemInfo.appendChild(cardItemTitle);
                        cardItemInfo.appendChild(cardItemDescription)
                        
                        cardItem.appendChild(cardItemInfo);
                        card.appendChild(cardItem);
                        carousel.appendChild(card)
                      }
                      
                     
                      
                     
                      //tagWrap.appendChild(tags);
                
                    
                      carousel.style.height = '430px';
                    //  document.addEventListener('DOMContentLoaded', ()=> {
                 
                        var elems = document.querySelectorAll('.carousel-desktop');
                        var instances = M.Carousel.init(elems,{indicators:true,dist:0,shift:15});
                        
                    
                    
        }
        render() {
                return  (
                        <div style={{flex:1,display:this.props.display,
                                flexDirection:'column',background:'#141414'}}>
                            <div id="carousel-desktop" className="carousel-desktop carousel carousel-slider center" style={{position:'relative',top:'9px',width:'100%',background:'#151515'}}>

</div>
                        </div>
                )

        }
       
 }


  
export default Carousel;