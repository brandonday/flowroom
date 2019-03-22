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
let nextDate = '';
let previousDate = '';
class RoomPosts extends Component {
    constructor() {
        super();
        this.state = {
            roomsLoaded:false,
            lastRoom:'',
            firstRoom:'',
            commmunitiesFilter:{},
            filters:{},
            roomFilters:{},
            mobile:false,
            lastRoomNum:'',
            isAllRes:false,
            isTable:false,
            isDesktop:false,
            isLive:false,
            isRemixable:'',
            isAI:false,
            isVR:false,
            is360:false,
            isProduction:false,
            isUnlisted:false,
            isPrivate:false,
            isWeb:false,
            isNative:false,
            isWebNative:false,
            rooms:[]
        }
    }
    componentDidMount() {

        let database = firebase.database();
        let that = this;
        let store = Store;
        let counter = 0;
                database.ref('categorizations/Regular/').orderByChild('date').limitToLast(roomsPerPage + 1).once('value').then((snapshot) => {

                    snapshot.forEach((childSnapShot) => {
                        counter++;
                       
                        if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
                          if(counter == 1) {
                            nextDate = childSnapShot.val().date;
                          
                            console.log('rooms: next date', childSnapShot.val().shortID + ' ',  nextDate);
                          } else {
                            if(counter == roomsPerPage + 1) {
                              previousDate = childSnapShot.val().date;
                              console.log('rooms: previous date', childSnapShot.val().shortID + ' ', previousDate);
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
                                comments:childSnapShot.val().comments,
                                likes:childSnapShot.val().likes,
                                description:childSnapShot.val().description,
                                objectNum:childSnapShot.val().objectNum,
                                postedPicURL:childSnapShot.val().postedPicURL,
                                isRemixable:childSnapShot.val().isRemixable,
                                roomType:childSnapShot.val().roomType,
                                username:childSnapShot.val().userName,
                                shortID:childSnapShot.val().shortID,
                                room_title:childSnapShot.val().room_title,
                                ...childSnapShot
                            });


                          }
                        
                    }


                    });
                    console.log('rooms: loading',rooms)
                    
                    that.setState({rooms:rooms})
                    that.setState({roomsLoaded:true});
                  
                    rooms = [];
               });
           


        store.dispatch({type:'SAVE_DHTML', html:'',css:'',js:''});


    }



    prevPage() {
        currentPage = currentPage === 1 ? 1 : currentPage - 1;
        rooms = [];
        let database = firebase.database();
        let that = this;
        let counter = 0;
        
        database.ref('categorizations/Regular').orderByChild('date').startAt(previousDate).limitToLast(roomsPerPage + 1).once('value').then((snapshot) => {
        
         
           snapshot.forEach((childSnapShot) => {

                //if(rooms.length != 7) {
            if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
            
              counter++;
              if(counter == 1) {
                nextDate = childSnapShot.val().date;
        
                console.log('rooms: next date', childSnapShot.val().shortID + ' ', nextDate);
              } else {
                if(counter == roomsPerPage + 1) {
                  previousDate = childSnapShot.val().date;
               
                  console.log('rooms: previous date', childSnapShot.val().shortID + ' ', previousDate);
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
                        comments:childSnapShot.val().comments,
                        likes:childSnapShot.val().likes,
                        description:childSnapShot.val().description,
                        objectNum:childSnapShot.val().objectNum,
                        postedPicURL:childSnapShot.val().postedPicURL,
                        isRemixable:childSnapShot.val().isRemixable,
                        roomType:childSnapShot.val().roomType,
                        username:childSnapShot.val().userName,
                        shortID:childSnapShot.val().shortID,
                        room_title:childSnapShot.val().room_title,
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
               
            
             

                    rooms = [];

           


        });
    }
    nextPage() {
        
        rooms = [];
        let database = firebase.database();
        let that = this;
        let counter = 0;
        database.ref('categorizations/Regular/').orderByChild('date').limitToLast(roomsPerPage + 1).endAt(nextDate).once('value').then((snapshot) => {
          if(snapshot.length == 0) {
            return;
          }  
        
          snapshot.forEach((childSnapShot) => {
                if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
                  
                  
                    counter++;
                    if(counter == 1) {
                      nextDate = childSnapShot.val().date;
                      console.log('rooms: next date', childSnapShot.val().shortID + ' ', nextDate);
                    } else {
                      if(counter == roomsPerPage + 1) {
                        previousDate = childSnapShot.val().date;
                     
                        console.log('rooms: previous date', childSnapShot.val().shortID + ' ', previousDate);
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
                            comments:childSnapShot.val().comments,
                            likes:childSnapShot.val().likes,
                            description:childSnapShot.val().description,
                            objectNum:childSnapShot.val().objectNum,
                            postedPicURL:childSnapShot.val().postedPicURL,
                            isRemixable:childSnapShot.val().isRemixable,
                            roomType:childSnapShot.val().roomType,
                            username:childSnapShot.val().userName,
                            shortID:childSnapShot.val().shortID,
                            room_title:childSnapShot.val().room_title,
                            
                        ...childSnapShot
                    });
                  }

                //alert(childSnapShot.val().shortID)
              

            }

            });
            if(counter == 1) {
              return;
            }
                console.log('rooms: next',rooms)
                this.setState({rooms:rooms, roomsLoaded:true});
                rooms = [];

              
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
                                    <Nav/>
                                    <RoomFilters/>
                                </div>
                                <div style={{position:'relative'}}>


                                            <StackGrid

                                            columnWidth={width <= 800 ? '100%' : '33.33%'}
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
                                  console.log('room obj', i);
                                    return (<div><RoomPost id={i}
                                        description={i.description}
                                        isRemixable={i.isRemixable}
                                        postedPicURL={i.postedPicURL}
                                        roomType={i.roomType}
                                        pic={i.pic}
                                        roomHeight={'auto'}
                                        username={i.username}
                                        points = {i.hasOwnProperty("points") ? i.points : 0}
                                        views = {i.hasOwnProperty("views") ? i.views : 0}
                                        likes = {i.hasOwnProperty("likes") ? i.likes : 0}
                                        commentsCount = {i.hasOwnProperty("commentsCount") ? i.commentsCount : 0}
                                        key={i}
                                        shortID={i.shortID}
                                        room_title={i.room_title}
                                        tags={['Fun', 'Game', 'Meme','Meme','Meme','Meme','Meme','Meme','Meme','Meme']}
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


const ConnectedRoomPosts = connect(undefined)(RoomPosts)

//export default sizeMe()(ConnectedRoomPosts);
export default ConnectedRoomPosts;
