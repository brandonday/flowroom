import React, { Component } from 'react';
import Nav from './Navigation.js';
import RoomFilters from './RoomFilters.js';
import RoomPost from './RoomPost.js';
import Responsive from 'react-responsive';
import Communities from './Communities.js';
import {Link} from 'react-router-dom';
import { firebase } from '.././firebase/firebase';
import StackGrid from "react-stack-grid";
import { connect } from 'react-redux';
import { Store } from './store.js';
import sizeMe from 'react-sizeme';
import ReactResizeDetector from 'react-resize-detector';
import { roomsFiltersOne } from '../../actions/filters';
const store = Store;

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

// let rooms = [{
//     id:312321,
//     date: new Date(),
//     html:'',
//     css:'',
//     js:'',
//     pic:'',
//     views:'',
//     comments:'',
//     likes:'',
//     description:'A remixable space game example',
//     objectNum:0,
//     postedPicURL:'',
//     isRemixable:true,
//     roomType:'other'
// },
// {
//     id:34321,
//     date: new Date(),
//     html:'',
//     css:'',
//     js:'',
//     pic:'',
//     views:'',
//     comments:'',
//     likes:'',
//     description:'Before and after slider',
//     objectNum:0,
//     postedPicURL:'',
//     isRemixable:false,
//     roomType:'text'
// },
// {
//     id:34529921,
//     date: new Date(),
//     html:'',
//     css:'',
//     js:'',
//     pic:'',
//     views:'',
//     comments:'',
//     likes:'',
//     description:'Virtual Reality Room demo',
//     objectNum:0,
//     postedPicURL:'',
//     isRemixable:false,
//     roomType:'other'
// },
// {
//     id:34554989321,
//     date: new Date(),
//     html:'',
//     css:'',
//     js:'',
//     pic:'',
//     views:'',
//     comments:'',
//     likes:'',
//     description:'website theme demo',
//     objectNum:0,
//     postedPicURL:'https://akns-images.eonline.com/eol_images/Entire_Site/2018718/rs_634x1024-180818125317-634-kim-kardashian.cm.81818.jpg?fit=inside|900:auto&output-quality=90',
//     isRemixable:false,
//     roomType:'image'
// },
// {
//     id:3453094095321,
//     date: new Date(),
//     html:'',
//     css:'',
//     js:'',
//     pic:'',
//     views:'',
//     comments:'',
//     likes:'',
//     description:' A Candle Object',
//     objectNum:0,
//     postedPicURL:'',
//     isRemixable:true,
//     roomType:'other'
// },
// {
//     id:34553254501,
//     date: new Date(),
//     html:'',
//     css:'',
//     js:'',
//     pic:'',
//     views:'',
//     comments:'',
//     likes:'',
//     description:'Slideshow app',
//     objectNum:0,
//     postedPicURL:'',
//     isRemixable:true,
//     roomType:'other'
// }];

let rooms = [];
let roomsFilter = [];
let roomsBackUp = [];
let currentPage = 1;
let roomsPerPage = 6;
let nextRoomIndex = '';
let previousRoomIndex = '';
let roomFilter = 'weight';
let navSelected;
let database = firebase.database();
class RoomPosts extends Component {
    constructor() {
        super();
        this.state = {
            roomsLoaded:false,
            lastRoom:'',
            firstRoom:'',
            mobile:false,
            lastRoomNum:'',
            rooms:[],
            filter:'weight'
        }
        this.selection = this.selection.bind(this)
    }
    componentDidMount() {

      
      
        
        
          
         console.log('filters :', roomFilter)
       
        
       this.loadRooms()
       
        
        


        //store.dispatch({type:'SAVE_DHTML', html:'',css:'',js:''});


    }
    isShortIDExists(shortID) {
      for(let i = 0; i < rooms.length; i++) {
          if(rooms[i].shortID == shortID) {
              return true;
          }
      }
      return false;
  }
    loadRooms() {
      let counter = 0;

      let that = this;
      database.ref('rooms').orderByChild(roomFilter).limitToLast(roomsPerPage + 1).once('value').then((snapshot) => {

        snapshot.forEach((childSnapShot) => {
            counter++;
            if(!this.isShortIDExists(childSnapShot.val().shortID)) {
            if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
              if(counter == 1) {
                if(roomFilter == 'weight') {
                  nextRoomIndex = childSnapShot.val().weight;
                } else if(roomFilter == 'likes') {
                  nextRoomIndex = childSnapShot.val().likes;
                } else {
                  nextRoomIndex = childSnapShot.val().date;
                }
                
                console.log('rooms: next date', childSnapShot.val().shortID + ' ',  nextRoomIndex);
              } else {
                if(counter == roomsPerPage + 1) {
                  if(roomFilter == 'weight') {
                    previousRoomIndex = childSnapShot.val().weight;
                  } else if(roomFilter == 'likes') {
                    previousRoomIndex = childSnapShot.val().likes;
                  } else {
                    previousRoomIndex = childSnapShot.val().date;
                  }
                }
               let tagsArray = [];
                if(childSnapShot.val().tags !== undefined) {
                  Object.keys(childSnapShot.val().tags).forEach((key) => {
                    tagsArray.push(childSnapShot.val().tags[key].text);
                  });
                } 
                rooms.unshift({
                    id:childSnapShot.key,
                    date:childSnapShot.val().date,
                    isAR:childSnapShot.val().isAR,
                    isDevelopmental:childSnapShot.val().isDevelopmental,
                    is360:childSnapShot.val().is360,
                    isAI:childSnapShot.val().isAI,
                    isDesktop:childSnapShot.val().isDesktop,
                    isDeveloper:childSnapShot.val().isDeveloper,
                    isLive:childSnapShot.val().isLive,
                    isLocked:childSnapShot.val().isLocked,
                    isMobile:childSnapShot.val().isMobile,
                    isNSFW:childSnapShot.val().isNSFW,
                    isVR:childSnapShot.val().isVR,
                    pic:childSnapShot.val().pic,
                    views:childSnapShot.val().views,
                    commentsCount:childSnapShot.val().commentsCount === undefined ? 0:childSnapShot.val().commentsCount,
                    likes:childSnapShot.val().likes === undefined ? 0 : childSnapShot.val().likes,
                    description:childSnapShot.val().description,
                    objectNum:childSnapShot.val().objectNum,
                    postedPicURL:childSnapShot.val().postedPicURL,
                    isRemixable:childSnapShot.val().isRemixable,
                    roomType:childSnapShot.val().roomType,
                    username:childSnapShot.val().userName,
                    shortID:childSnapShot.val().shortID,
                    room_title:childSnapShot.val().room_title,
                    tags:tagsArray,
                    room_card_height:childSnapShot.val().room_card_height !== '' && !isNaN(childSnapShot.val().room_card_height) ? parseInt(childSnapShot.val().room_card_height):246,
                    ...childSnapShot
                });


              }
            
        }

        }
        });
        console.log('rooms: loading',rooms)
        
        that.setState({rooms:rooms})
        that.setState({roomsLoaded:true});
      
        
        
      });

    }
getSearchFromFilter(id) {
      switch(id) {
          case 'featured':
              return 'weight';
          case 'trending':
              return 'likes';
          case 'recent':
              return 'date';
          default: 
              return 'date';
      }
  }
  selection(id) {
   
      document.getElementById(id).className = 'selected';
     let getSelected = document.getElementsByClassName('selected');
    
     for(let i = 0; i < getSelected.length; i++) {
         if(getSelected[i].id !== id) {
            
             getSelected[i].className = '';
         } else {
          
            getSelected[i].className = 'selected';
         }
     }
     console.log('search filters :', this.getSearchFromFilter(id))
     
     roomFilter = this.getSearchFromFilter(id);
     rooms = [];
      this.loadRooms();
      

  }
    openModal(post = true) {
      this.props.openModal({isModalOpen:true, modalType:'room', post:post, customStyles:{
        overlay: {
          backgroundColor: 'none',
        },
        content: {
        top                   : '50%',
        left                  : '50%',
        right                 : '0',
        bottom                : 'auto',
        marginRight           : '0%',
        transform             : 'translate(-50%, -50%)',
        height:'50%',
        width:'50%',
        }
      }})
    }

  getNumTags(tagsArray) {
    console.log('inner width :', window.innerWidth);
     let maxLength = window.innerWidth >= 1024 ? 20 : 12;
      if(tagsArray.length <= 1) {
        return tagsArray.length;
      } else if(tagsArray.length === 2) {
        if(tagsArray[0].length + tagsArray[1].length > maxLength) {
          return 1;
        } else {
          return 2;
        }         
      } else {
        if(tagsArray[0].length > 12 || tagsArray[0].length + tagsArray[1].length > maxLength) {
          return 1;
        }
        if(tagsArray[0].length + tagsArray[1].length + tagsArray[2].length > maxLength) {
          return 2;
        } else {
          return 3;
        }   
      } 

    }
    prevPage() {
        currentPage = currentPage === 1 ? 1 : currentPage - 1;
        rooms = [];
        let database = firebase.database();
        let that = this;
        let counter = 0;
        
        database.ref('rooms').orderByChild(roomFilter).startAt(previousRoomIndex).limitToFirst(roomsPerPage + 1).once('value').then((snapshot) => {
        
         
           snapshot.forEach((childSnapShot) => {

                //if(rooms.length != 7) {
            if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
            
              counter++;
              if(counter == 1) {
                if(roomFilter == 'weight') {
                  nextRoomIndex = childSnapShot.val().weight;
                } else if(roomFilter == 'likes') {
                  nextRoomIndex = childSnapShot.val().likes;
                } else {
                  nextRoomIndex = childSnapShot.val().date;
                }
              } else {
                if(counter == roomsPerPage + 1) {
                  if(roomFilter == 'weight') {
                    previousRoomIndex = childSnapShot.val().weight;
                  } else if(roomFilter == 'likes') {
                    previousRoomIndex = childSnapShot.val().likes;
                  } else {
                    previousRoomIndex = childSnapShot.val().date;
                  }
                }
                let tagsArray = [];
                if(childSnapShot.val().tags !== undefined) {
                  Object.keys(childSnapShot.val().tags).forEach((key) => {
                    tagsArray.push(childSnapShot.val().tags[key].text);
                  });
                } 
                    rooms.unshift({
                        id:childSnapShot.key,
                        date:childSnapShot.val().date,
                        isAR:childSnapShot.val().isAR,
                        isDevelopmental:childSnapShot.val().isDevelopmental,
                        is360:childSnapShot.val().is360,
                        isAI:childSnapShot.val().isAI,
                        isDesktop:childSnapShot.val().isDesktop,
                        isDeveloper:childSnapShot.val().isDeveloper,
                        isLive:childSnapShot.val().isLive,
                        isLocked:childSnapShot.val().isLocked,
                        isMobile:childSnapShot.val().isMobile,
                        isNSFW:childSnapShot.val().isNSFW,
                        isVR:childSnapShot.val().isVR,
                        pic:childSnapShot.val().pic,
                        views:childSnapShot.val().views,
                        commentsCount:childSnapShot.val().commentsCount === undefined ? 0:childSnapShot.val().commentsCount,
                        likes:childSnapShot.val().likes === undefined ? 0:childSnapShot.val().likes,
                        description:childSnapShot.val().description,
                        objectNum:childSnapShot.val().objectNum,
                        postedPicURL:childSnapShot.val().postedPicURL,
                        isRemixable:childSnapShot.val().isRemixable,
                        roomType:childSnapShot.val().roomType,
                        username:childSnapShot.val().userName,
                        shortID:childSnapShot.val().shortID,
                        room_title:childSnapShot.val().room_title,
                        tags:tagsArray,
                        room_card_height:childSnapShot.val().room_card_height !== '' ? parseInt(childSnapShot.val().room_card_height):246,
                        ...childSnapShot
                    });

                  }
                //alert(childSnapShot.val().shortID)
            //}
            }

            });
            console.log('rooms: counter', counter)
            if(counter == 1) {
              return;
            }
              console.log('rooms previous',rooms)
                this.setState({rooms:rooms});
                this.setState({roomsLoaded:true});
               
            
             

                   

           


        });
    }
    nextPage() {
        
        rooms = [];
        let database = firebase.database();
        let that = this;
        let counter = 0;
        console.log('next page nextRoomIndex:', nextRoomIndex);
        console.log('next page prevRoomIndex:', previousRoomIndex);
        database.ref('rooms').orderByChild(roomFilter).limitToLast(roomsPerPage + 1).endAt(nextRoomIndex).once('value').then((snapshot) => {
          if(snapshot.length == 0) {
            return;
          }  
        
          snapshot.forEach((childSnapShot) => {
                if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
                  
                  
                    counter++;
                    if(counter == 1) {
                      if(roomFilter == 'weight') {
                        nextRoomIndex = childSnapShot.val().weight;
                      } else if(roomFilter == 'likes') {
                        nextRoomIndex = childSnapShot.val().likes;
                      } else {
                        nextRoomIndex = childSnapShot.val().date;
                      }

                    } else {
                      if(counter == roomsPerPage + 1) {
                        if(roomFilter == 'weight') {
                          previousRoomIndex = childSnapShot.val().weight;
                        } else if(roomFilter == 'likes') {
                          previousRoomIndex = childSnapShot.val().likes;
                        } else {
                          previousRoomIndex = childSnapShot.val().date;
                        }
                      }
                      let tagsArray = [];
                      if(childSnapShot.val().tags !== undefined) {
                        Object.keys(childSnapShot.val().tags).forEach((key) => {
                          tagsArray.push(childSnapShot.val().tags[key].text);
                        });
                      } 

                     
                        rooms.unshift({
                            id:childSnapShot.key,
                            date:childSnapShot.val().date,
                            isAR:childSnapShot.val().isAR,
                            isDevelopmental:childSnapShot.val().isDevelopmental,
                            is360:childSnapShot.val().is360,
                            isAI:childSnapShot.val().isAI,
                            isDesktop:childSnapShot.val().isDesktop,
                            isDeveloper:childSnapShot.val().isDeveloper,
                            isLive:childSnapShot.val().isLive,
                            isLocked:childSnapShot.val().isLocked,
                            isMobile:childSnapShot.val().isMobile,
                            isNSFW:childSnapShot.val().isNSFW,
                            isVR:childSnapShot.val().isVR,
                            pic:childSnapShot.val().pic,
                            views:childSnapShot.val().views,
                            commentsCount:childSnapShot.val().commentsCount === undefined ? 0 : childSnapShot.val().commentsCount,
                            likes:childSnapShot.val().likes === undefined ? 0:childSnapShot.val().likes,
                            description:childSnapShot.val().description,
                            objectNum:childSnapShot.val().objectNum,
                            postedPicURL:childSnapShot.val().postedPicURL,
                            isRemixable:childSnapShot.val().isRemixable,
                            roomType:childSnapShot.val().roomType,
                            username:childSnapShot.val().userName,
                            shortID:childSnapShot.val().shortID,
                            room_title:childSnapShot.val().room_title,
                            tags:tagsArray,
                            room_card_height:childSnapShot.val().room_card_height !== '' ? parseInt(childSnapShot.val().room_card_height):246,
                        ...childSnapShot
                    });
                  }

                //alert(childSnapShot.val().shortID)
              

            }

            });
            console.log('next page after nextRoomIndex :', nextRoomIndex);
     
            console.log('next page after prevRoomIndex:', previousRoomIndex);
            if(counter == 1) {
              return;
            }
                console.log('rooms: next',rooms)
                this.setState({rooms:rooms, roomsLoaded:true});
                

              
        });
    }
    render() {

         if(this.state.roomsLoaded) {
        //     let theHeight;
            return  (
              <ReactResizeDetector
  handleWidth
  handleHeight
  render={({ width, height }) => (
                <div style={{padding:'0px 10px', height:'100%'}}>
                    <div id="body-padding" style={{
                        flex:1
                    }}>
                        <section style={{flex:1}}>
                            <div className="main" style={{flex:1}}>
                                <div style={{display:'flex', flex:1, flexWrap:'wrap', justifyContent:'space-between', margin:'20px 0px 20px auto',fontSize:'16px'}}>
                                <nav className="main-nav">
                    <ul id="nav-lists">
                        <li id="featured" className="selected" onClick={()=>{
                           this.selection('featured');

                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Featured</li> 
                        <li id="trending" onClick={()=> {
                            this.selection('trending')
                            }} style={{ textDecoration: 'none', color:'#979AA1' }}  activeClassName="is-active">Trending</li>
                        <li id="recent" onClick={()=> {
                            this.selection('recent')
                            }} style={{ textDecoration: 'none', color:'#979AA1' }}  activeClassName="is-active">Recent</li> 
                              
                        {/* <li id="popular" onClick={()=>{
                            this.selection('popular');
                            
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Popular</li> */}
                        
                        {/* <li id="random" onClick={()=>{
                            this.selection('random')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Random</li> 
                        <li id="recent" onClick={()=>{
                            this.selection('recent')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Recent</li>
                        <li id="myrooms" onClick={()=>{
                            this.selection('myrooms')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >My Rooms</li> 
                        <li id="favorited" onClick={()=>{
                            this.selection('favorited')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Favorited</li> 
                        <li id="followers" onClick={()=>{
                            this.selection('followers')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Followers</li>
                         <li id="following" onClick={()=>{
                            this.selection('following')
                        }} style={{ textDecoration: 'none', color:'#979AA1' }} >Following</li>   */}
                    </ul>
                     {/* <a href="" className="drop-down-arrow my-communities-down-3x"></a>  */}
                </nav>
                                    <RoomFilters/>
                                </div>
                                <div style={{position:'relative'}}>


                                            <StackGrid

                                            columnWidth={width >= 1024 ? 420 : (width >= 768 ? 290 : (width > 320 ? 320 : 280))}
                                            gutterWidth={30}
                                            gutterHeight={20}
                                            horizontal={false}
                                          >
                        {

                            this.state.rooms.map((i)=> {
                              
                              console.log('main rendered',i)
                                // if(i.isRemixable === true) {
                                //     return (<div><RoomPost id={i}
                                //         description={i.description}
                                //         isRemixable={i.isRemixable}
                                //         postedPicURL={i.postedPicURL}
                                //         roomType={i.roomType}
                                //         pic={i.pic}
                                //         roomHeight={'auto'}
                                //         username={i.username}
                                //         points = {i.hasOwnProperty("points") ? i.points : 0}
                                //         views = {i.hasOwnProperty("views") ? i.views : 0}
                                //         likes = {i.hasOwnProperty("likes") ? i.likes : 0}
                                //         commentsCount = {i.hasOwnProperty("commentsCount") ? i.commentsCount : 0}
                                //         key={i}
                                //     />
                                //     </div>)
                                // }
                                // if (i.roomType === 'image') {
                                //     return (<div><RoomPost id={i}
                                //         description={i.description}
                                //         isRemixable={i.isRemixable}
                                //         postedPicURL={i.postedPicURL}
                                //         roomType={i.roomType}
                                //         pic={i.pic}
                                //         roomHeight={'auto'}
                                //         username={i.username}
                                //         points = {i.hasOwnProperty("points") ? i.points : 0}
                                //         views = {i.hasOwnProperty("views") ? i.views : 0}
                                //         likes = {i.hasOwnProperty("likes") ? i.likes : 0}
                                //         commentsCount = {i.hasOwnProperty("commentsCount") ? i.commentsCount : 0}
                                //         key={i}
                                //     /></div>)
                                // }
                                if (i.roomType === 'other') {
                                  console.log('room obj: ', i);
                                    return (<div><RoomPost id={i}
                                        description={i.description}
                                        isRemixable={i.isRemixable}
                                        postedPicURL={i.postedPicURL}
                                        roomType={i.roomType}
                                        pic={i.pic}
                                        roomHeight={i.room_card_height}
                                        roomWidth={width}
                                        username={i.username}
                                        points = {i.hasOwnProperty("points") ? i.points : 0}
                                        views = {i.hasOwnProperty("views") ? i.views : 0}
                                        likes = {i.hasOwnProperty("likes") ? i.likes : 0}
                                        commentsCount = {i.hasOwnProperty("commentsCount") ? i.commentsCount : 0}
                                        key={i}
                                        shortID={i.shortID}
                                        room_title={i.room_title}
                                        tags={i.tags}
                                        numTags={this.getNumTags(i.tags)}
                                        
                                    /></div>)
                               }
                                // if (i.roomType === 'text') {
                                //     return (<div><RoomPost id={i}
                                //         description={i.description}
                                //         isRemixable={i.isRemixable}
                                //         postedPicURL={i.postedPicURL}
                                //         roomType={i.roomType}
                                //         pic={i.pic}
                                //         roomHeight={'340px'}
                                //         username={i.username}
                                //         points = {i.hasOwnProperty("points") ? i.points : 0}
                                //         views = {i.hasOwnProperty("views") ? i.views : 0}
                                //         likes = {i.hasOwnProperty("likes") ? i.likes : 0}
                                //         commentsCount = {i.hasOwnProperty("commentsCount") ? i.commentsCount : 0}
                                //         key={i}
                                //     /></div>)
                                // }

                                })

                        }
                                          </StackGrid>


                                </div>
                            </div>

                        </section>
                        <nav  style={{flex:1}} className="pagination-buttons-wrap">
                            <span onClick={this.prevPage.bind(this)} className="pagination-button"><span style={{display:'inline-block', background: "url('/images/sprite.png') no-repeat", overflow:'hidden',textIndent:'-9999px', textAlign:'left',backgroundSize:'89px 248px',backgroundPosition:'-75px -184px',width:'10px',height:'18px', marginRight:'15px', transform: 'rotate(179deg)'}}></span>Previous Page</span>
                            <span onClick={this.nextPage.bind(this)} className="pagination-button">Next Page<span style={{display:'inline-block', background: "url('/images/sprite.png') no-repeat", overflow:'hidden',textIndent:'-9999px', textAlign:'left',backgroundSize:'89px 248px',backgroundPosition:'-75px -184px',width:'10px',height:'18px',marginLeft:'15px'}}></span></span>
                        </nav>
                    </div>
                </div>
                )}
                />

            )

        } else {
            return (<div>loading...</div>)
        }

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        state:state,
        props:ownProps
    }
}



const ConnectedRoomPosts = connect(mapStateToProps)(RoomPosts)

//export default sizeMe()(ConnectedRoomPosts);
export default ConnectedRoomPosts;
