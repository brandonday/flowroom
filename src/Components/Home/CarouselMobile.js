import React, { Component } from 'react';
import RoomPosts from './RoomPosts.js';
import Communities from './Communities.js';
import Footer from './Footer.js';
import AppModal from './AppModal';
import Create from './Create';
import { firebase } from '../firebase/firebase';
import createHistory from 'history/createBrowserHistory';
import M from 'materialize-css';
// import M from 'materialize-css'

let history = createHistory();

 class CarouselMobile extends Component {
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
                        madeBy:'',
                        shortID:'erwe#'
                      },
                      {image:'https://media.giphy.com/media/j5nIN00OlCmZJYxAA1/giphy.gif',
                        title:'Remixable Kaleidoscope',
                        description:'This is a sample description',
                        price:'',
                        rating:4,
                        ageRating:'18+',
                        creatorAvatar:'',
                        creatorName:'',
                        madeBy:'',
                        shortID:'edsds#'
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
                      let carousel = document.getElementById('carousel-mobile');
                      
                      for(let i=0; i < data.length; i++) {
                        let card = document.createElement('div');
                        let cardItem = document.createElement('a');
                        let cardItemImage = document.createElement('div');
                        let cardItemInfo = document.createElement('div');
                        let cardItemTitle = document.createElement('p');
                        cardItemTitle.appendChild(document.createTextNode(data[i].title))
                        let cardItemDescription = document.createElement('p');
                        cardItemDescription.appendChild(document.createTextNode(data[i].description))
                
                        card.className = 'carousel-item-wrap-mobile';
                        cardItem.className = 'carousel-item carousel-item-c-mobile';
                        cardItem.setAttribute("href","dffdfsd");
                        // cardItem.style.transform = 'translateX(29.5px) translateY(62px) translateX(-245px) translateZ(-200px)'

                        cardItemImage.className = 'carousel-item-image-mobile';
                        cardItemImage.style.backgroundImage =`url(${data[i].image})`;
                        cardItemImage.style.backgroundSize = 'cover';
                        cardItemImage.style.backgroundRepeat = 'no-repeat'
                        cardItemImage.style.backgroundPosition = 'center center';
                        cardItemInfo.className = 'carousel-item-info-mobile';
                        cardItemTitle.className = 'carousel-item-title-mobile';
                        cardItemDescription.className = 'carousel-item-description-mobile'
                        let carouselItemMobile = document.getElementsByClassName('carousel-item-c-mobile');
           
                        cardItem.appendChild(cardItemImage);
                        cardItemInfo.appendChild(cardItemTitle);
                        cardItemInfo.appendChild(cardItemDescription)
                        
                        cardItem.appendChild(cardItemInfo);
                        cardItem.setAttribute("id", `${data[i].shortID}`)
                        card.appendChild(cardItem);
                        
                        
                        carousel.appendChild(card)
                      }
                      
                     
                      
                     
                      //tagWrap.appendChild(tags);
                
                      //let options = {indicators:true,dist:0,shift:15}
                //       document.addEventListener('DOMContentLoaded', ()=> {
                //         var elems = document.querySelectorAll('.carousel');
                //         //var instances = M.Carousel.init(elems);
                        
                 
                       
                //       });
                      carousel.style.height = '347px';
                      
                      var elems = document.querySelectorAll('.carousel-mobile');
                      var instances = M.Carousel.init(elems,{indicators:false,shift:25,dist:-20,onCycleTo:function(data){
                        //var elems = document.querySelectorAll('.tap-target');
                        
                        
                      // let id = document.querySelectorAll('.carousel-item-c-mobile');
               
                     
                      
                      }});
                     
        }
        render() {
                return  (
                        <div style={{flex:1,
                                flexDirection:'column',background:'#141414',width:'100%'}}>
                             <div id="carousel-mobile" className="carousel carousel-mobile carousel-slider center" style={{position:'relative',top:'9px',width:'100%',display:this.props.display}}>
                                
                        </div>
                        </div>
                )

        }
       
 }


  
export default CarouselMobile;