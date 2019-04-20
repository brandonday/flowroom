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
import Masonry from 'react-masonry-component';

const masonryOptions = {
  transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }


const store = Store;

let rooms = [];
let roomsFilter = [];
let roomsBackUp = [];
let currentPage = 1;
let roomsPerPage = window.innerWidth >= 1024 ? 6 : 4;
// let columnsPerPage = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : (window.innerWidth > 320 ? 1 : 1));
let nextRoomIndex = '';
let previousRoomIndex = '';
let roomFilter = 'weight';
let navSelected;
let database = firebase.database();
let ROOM_ASPECT_RATIO = 1;
let timer = null;

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
      filter:'weight',
      error: false,
      hasMore: true,
      isLoading: false
    }
    this.selection = this.selection.bind(this);   
  }
  componentDidMount() {
    console.log('[RoomPosts] componentDidMount');
   
    window.addEventListener('scroll', this.handleScroll.bind(this), true);
    this.loadRooms();
        // store.dispatch({type:'SAVE_DHTML', html:'',css:'',js:''});
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
  setRoomVisibility() {
    console.log('setRoomVisibility');
    let roomPosts = document.getElementsByClassName('room-post');
    let countVisible = 0;
    for(let i = 0; i < roomPosts.length; i++) {
      let rect = roomPosts[i].getBoundingClientRect();
      let midY = (rect.top + rect.bottom)/2 + window.scrollY;
      let shortID = roomPosts[i].id.replace('room_', '');
      let frame = document.getElementById(shortID);
      let thumbnail = document.getElementById(`thumbnail_${shortID}`)
      if(frame == null) {
        continue;
      } 
      if(midY >= 0 && midY < window.innerHeight) {
        console.log('scroll Y :', i, 'visible');
        if(thumbnail.style.display == 'none') {
          countVisible++;
            continue;
        }
       
        if(frame.attachEvent) {
          frame.attachEvent("onload", function(){
            console.log("Local iframe is now loaded.(IE)");
            thumbnail.style.display = 'none';
          });
        } else {
          frame.onload = function() {
            console.log("Local iframe is now loaded.(non-IE)");
            thumbnail.style.display = 'none';
          };
        }
        thumbnail.style.display = 'block';
        frame.style.display = 'block';
        frame.src = `/full/${shortID}`;
        countVisible++;
      } else {
      // frame.src = 'http://test.flowroom.com/test';
        frame.style.display = 'none';
        thumbnail.style.display = 'block';
      }
    }
  }
  handleScroll(event) {
    console.log('[RoomPosts] handleScroll');
    let that = this;
    if(timer !== null) {
      clearTimeout(timer);        
    }
    timer = setTimeout(()=> {
      that.setRoomVisibility();
      that.processLoadMore();
    }, 150);
  }
  isShortIDExists(shortID) {
    for(let i = 0; i < rooms.length; i++) {
      if(rooms[i].shortID == shortID) {
        return true;
      }
    }
    return false;
  }
  processLoadMore() {
    console.log('process load more');
    if (this.state.error || this.state.isLoading || !this.state.hasMore ) return;
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
        
      this.nextPage();

    }
  }
  loadRooms() {
    console.log('load rooms');
    let counter = 0;
    let that = this;
    database.ref('rooms').orderByChild(roomFilter).limitToLast(roomsPerPage + 1).once('value').then((snapshot) => {
      snapshot.forEach(
        (childSnapShot) => {
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
                    tags:childSnapShot.val().tags,
                    room_aspect_ratio:childSnapShot.val().room_aspect_ratio !== '' && !isNaN(childSnapShot.val().room_aspect_ratio) ? childSnapShot.val().room_aspect_ratio : ROOM_ASPECT_RATIO,
                    room_card_height:childSnapShot.val().room_card_height !== '' && !isNaN(childSnapShot.val().room_card_height) ? parseInt(childSnapShot.val().room_card_height) : 246,
                    thumbnail:childSnapShot.val().thumbnail,
                    ...childSnapShot
                });


              }
            
            }

          }
        });
        that.setState({rooms:rooms,roomsLoaded:true})
        that.setRoomVisibility();
      }
    );
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
    roomFilter = this.getSearchFromFilter(id);
    rooms = [];
    this.loadRooms();
  }
  openModal(post = true) {
    // this.props.openModal({isModalOpen:true, modalType:'room', post:post, customStyles: {
    //   overlay: {
    //     backgroundColor: 'none',
    //   },
    //   content: {
    //     top                   : '50%',
    //     left                  : '50%',
    //     right                 : '0',
    //     bottom                : 'auto',
    //     marginRight           : '0%',
    //     transform             : 'translate(-50%, -50%)',
    //     height:'50%',
    //     width:'50%',
    //   }
    // }})
  }
  getTagsArray(tags) {
    let tagsArray = [];
    if(tags !== undefined) {
      Object.keys(tags).forEach((key) => {
        tagsArray.push(tags[key].text);
      });
    } 
    return tagsArray;
  }
  getNumTags(tagsArray) {
    if(tagsArray == null || tagsArray == undefined || tagsArray.length == 0 ) {
      return 0;
    }
    let maxLength = window.innerWidth >= 1024 ? 20 : 12;
    try {
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
    } catch(error) {
    
    }
      return 0;
  }
  getTags(tags) {
    if(tags == null) {
      return [];
    }
    let tagsArray = this.getTagsArray(tags);
    let numTags = this.getNumTags(tagsArray);
    let tagsLengthArray = [];  
    tagsArray.map((tag)=> {
      if(tagsLengthArray.length < numTags) {
        tagsLengthArray.push(tag);
      }
    });
      return tagsLengthArray;
  }
  prevPage() {
    currentPage = currentPage === 1 ? 1 : currentPage - 1;
    rooms = [];
    let database = firebase.database();
    let that = this;
    let counter = 0;
    database.ref('rooms').orderByChild(roomFilter).startAt(previousRoomIndex).limitToFirst(roomsPerPage + 1).once('value').then (
      (snapshot) => {
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
                rooms.unshift (
                  {
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
                    tags:childSnapShot.val().tags,
                    room_aspect_ratio:childSnapShot.val().room_aspect_ratio !== '' ? childSnapShot.val().room_aspect_ratio :ROOM_ASPECT_RATIO,
                    room_card_height:childSnapShot.val().room_card_height !== '' && !isNaN(childSnapShot.val().room_card_height) ? parseInt(childSnapShot.val().room_card_height) : 246,
                    thumbnail:childSnapShot.val().thumbnail,
                    ...childSnapShot
                  }
                );
              }
            }
          }
        );
        if(counter == 1) {
          return;
        }
        this.setState({rooms:rooms,roomsLoaded:true});
      }
    );
  }
  nextPage() {
    console.log('next page');
    let nextRooms = [];
    let database = firebase.database();
    let that = this;
    let counter = 0;
    database.ref('rooms').orderByChild(roomFilter).limitToLast(roomsPerPage + 1).endAt(nextRoomIndex).once('value').then(
      (snapshot) => {
        if(snapshot.length == 0) {
          return;
        }  
        snapshot.forEach(
          (childSnapShot) => {
            if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
              counter++;
              if(!this.isShortIDExists(childSnapShot.val().shortID)) {
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
                  nextRooms.unshift (
                    {
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
                      tags:childSnapShot.val().tags,
                      room_aspect_ratio:childSnapShot.val().room_aspect_ratio !== '' ? childSnapShot.val().room_aspect_ratio:ROOM_ASPECT_RATIO,
                      room_card_height:childSnapShot.val().room_card_height !== '' && !isNaN(childSnapShot.val().room_card_height) ? parseInt(childSnapShot.val().room_card_height) : 246,
                      thumbnail:childSnapShot.val().thumbnail,
                      ...childSnapShot
                    }
                  );
                }
              }
            }
          }
        );
        nextRooms.forEach (
          (room) => {
            rooms.push(room);
          }
        );
        if(counter == 1) {
          return;
        }
        this.setState({rooms:rooms, roomsLoaded:true});
              
      }
    );
  }
  render() {
 
    const width = (window.innerWidth >= 1024 ? 1 : (window.innerWidth >= 768 ? 1 : (window.innerWidth > 320 ? 1 : 0.9))) * 320;
    const childElements = this.state.rooms.map (
      (i)=> {
       
          return (<div className="image-element-class">
            <div className="roomContainer">
            <div className="roomPostContainer" key={i.shortID} style={{width:width}} >
              <RoomPost  
              description={i.description === undefined || i.description === null  ? '' : i.description}
              isRemixable={i.isRemixable}
              postedPicURL={i.postedPicURL}
              roomType={i.roomType}
              pic={i.pic}
              roomHeight={(window.innerWidth >= 1024 ? 1 : (window.innerWidth >= 768 ? 1 : (window.innerWidth > 320 ? 1 : 1))) * i.room_card_height}
              roomWidth={width}
              username={i.username}
              points = {i.hasOwnProperty("points") ? i.points : 0}
              views = {i.hasOwnProperty("views") ? i.views : 0}
              likes = {i.hasOwnProperty("likes") ? i.likes : 0}
              commentsCount = {i.hasOwnProperty("commentsCount") ? i.commentsCount : 0}
              shortID={i.shortID}
              room_title={i.room_title}
              tags={this.getTags(i.tags)}
              numTags={this.getNumTags(this.getTagsArray(i.tags))}
              numTagsAll={this.getTagsArray(i.tags).length}
              thumbnail={i.thumbnail}/>
            </div>
            </div>
             
            </div>
          )
        
      }
    )
 
    if(this.state.roomsLoaded) {
      console.log('[RoomPosts] render')
      return (
        
            <div style={{padding:'0px', height:'100%'}}>
              {/* <div id="body-padding" style={{
                        flex:1
              }}> */}
              {/* <section style={{flex:1}}> */}
              {/* <div className="main" style={{flex:1}}> */}
              <div style={{display:'flex', flex:1, flexWrap:'wrap', justifyContent:'center', margin:'20px 0px 20px auto',fontSize:'16px'}}>
                <nav className="main-nav">
                  <ul id="nav-lists">
                    <li id="featured" className="selected" onClick={()=> {
                      this.selection('featured');

                    }} style={{ textDecoration: 'none', color:'#979AA1' }} >Featured</li> 
                    <li id="trending" onClick={()=> {
                      this.selection('trending')
                    }} style={{ textDecoration: 'none', color:'#979AA1' }} >Trending</li>
                    <li id="recent" onClick={()=> {
                      this.selection('recent')
                    }} style={{ textDecoration: 'none', color:'#979AA1' }}>Recent</li> 
                              
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
              {/* <div className="roomsContainer"> */}
                <div className="masonryContainer">
                  <Masonry
                    className="grid" // default ''
                    elementType={'div'} // default 'div'
               
                    >
                  {childElements}
                  </Masonry>
                {/* </div> */}
                {/* <StackGrid
                  duration={0}
                  columnWidth={width >= 1024 ? 420 : (width >= 768 ? 290 : (width > 320 ? 320 : 280))}
                  gutterWidth={30}
                  gutterHeight={20}
                  horizontal={false}> */}
                 
                {/* </StackGrid> */}
              </div>
              {/* </div> */}
              {/* </section> */}
              {/* <nav  style={{flex:1}} className="pagination-buttons-wrap">
              <span onClick={this.prevPage.bind(this)} className="pagination-button"><span style={{display:'inline-block', background: "url('/images/sprite.png') no-repeat", overflow:'hidden',textIndent:'-9999px', textAlign:'left',backgroundSize:'89px 248px',backgroundPosition:'-75px -184px',width:'10px',height:'18px', marginRight:'15px', transform: 'rotate(179deg)'}}></span>Previous Page</span>
              <span onClick={this.nextPage.bind(this)} className="pagination-button">Next Page<span style={{display:'inline-block', background: "url('/images/sprite.png') no-repeat", overflow:'hidden',textIndent:'-9999px', textAlign:'left',backgroundSize:'89px 248px',backgroundPosition:'-75px -184px',width:'10px',height:'18px',marginLeft:'15px'}}></span></span>
              </nav> */}
              {/* </div> */}
            </div>
       
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
