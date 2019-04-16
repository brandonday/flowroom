import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProfileRooms from './ProfileRooms.js';
import RoomPost from './RoomPost.js';
import { firebase } from '../firebase/firebase';
import StackGrid from "react-stack-grid";
import { connect } from 'react-redux';
import { Store } from './store.js';
import sizeMe from 'react-sizeme';
import ReactResizeDetector from 'react-resize-detector';

let name;
let rooms = [];
let roomsFilter = [];
let roomsBackUp = [];
let currentPage = 1;
let roomsPerPage = 6;
let nextRoomIndex = '';
let previousRoomIndex = '';
let roomFilter = 'date';
let navSelected;
let database = firebase.database();

class ProfilePage extends Component {
    constructor() {
        super();
        this.state = {
            hasName:'',
            myusername:'',
            loading:(<div style={{display:'flex',flex:'1'}}>loading...</div>),
            name:'',
            bio:'',
            pic:'',
            displayIfOwn:'none',
            followlbl:'follow',
            followersNum:0,
            followingNum:0,
            verified:'none',
            roomsLoaded:false,
            roomFilters:{},
            mobile:false,
            mobile:false,
            rooms:[],
            filter:'date'
        }
    }
    componentDidMount() {
      
        //let getRooms = (filtering) => {
            name = this.props.match.params.id.toLowerCase();
         
            this.loadRooms();

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
        database.ref(`UsersRooms/${name}`).orderByChild(roomFilter).limitToLast(roomsPerPage + 1).once('value').then((snapshot) => {
  
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
        
          //rooms = [];
          
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


    componentWillMount() {
        let that = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              let myusername = user.displayName;
              that.setState({myusername:myusername});
              that.getProfileInfo(myusername)
            } else {
              that.getProfileInfo('notsignedin')
            }
          });
   
    
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
            
            database.ref(`UsersRooms/${name}`).orderByChild(roomFilter).startAt(previousRoomIndex).limitToFirst(roomsPerPage + 1).once('value').then((snapshot) => {
            
             
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
            database.ref(`UsersRooms/${name}`).orderByChild(roomFilter).limitToLast(roomsPerPage + 1).endAt(nextRoomIndex).once('value').then((snapshot) => {
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
    getProfileInfo(myusername) {
        let name = this.props.match.params.id.toLowerCase();
        let ref = firebase.database().ref("users");
        ref.once("value")
          .then((snapshot) => {
              console.log(snapshot.val())
            let hasName = snapshot.hasChild(`${name}`); // true
            
            if(hasName) {
                let snap = snapshot.val();
                let bio = snap[name].bio;
                let pic = snap[name].pic;
                if(myusername !== name) {
                    this.setState({displayIfOwn:'block'});
                    this.isFollowing(myusername);
                    this.Followers(name);
                } else {
                    this.setState({displayIfOwn:'none'});
                    this.isFollowing(myusername);
                    this.Followers(name);
                }
                this.setState({hasName:'found', name:name, bio:bio, pic:pic});
            } else {
                this.setState({hasName:'notfound',loading:(<div style={{display:'flex',flex:'1'}}>not found</div>)});
    
            }
          });
    } 
    isFollowing(myusername) {
        
        let name = this.props.match.params.id.toLowerCase();
        let ref = firebase.database().ref(`follows/${name}/followers`);
        ref.once("value")
          .then((snapshot) => {
              console.log('f',snapshot.numChildren())
            this.setState({followersNum:snapshot.numChildren()})
            let hasName = snapshot.hasChild(`${myusername}`); // true
            
            if(hasName) {
                //shown when following
                this.setState({followlbl:'unfollow'});
           
            } else {
                this.setState({followlbl:'follow'});
            }
          });
    } 
    Followers(name) {
      
        let ref = firebase.database().ref(`follows/${name}/following`);
        ref.once("value")
          .then((snapshot) => {
    
            this.setState({followingNum:snapshot.numChildren()})
         
          });
    } 
    follow() {
        if(this.state.followlbl === 'follow') {
        firebase.database().ref(`follows/${this.state.name}/followers/`).update({
            [this.state.myusername]:this.state.myusername
        }).then(() => {

            firebase.database().ref(`follows/${this.state.myusername}/following/`).update({
                [this.state.name]:this.state.name
            }).then(() => {
           
                this.setState({followlbl:'unfollow',followersNum:++this.state.followersNum});
                
            }).catch((error) => {
    
            });
            
        }).catch((error) => {

        });
        
        } else {
            firebase.database().ref(`follows/${this.state.name}/followers/${this.state.myusername}`).remove().then(() => {
           
                firebase.database().ref(`follows/${this.state.myusername}/following/${this.state.name}`).remove().then(() => {
           
                    this.setState({followlbl:'follow',followersNum:--this.state.followersNum});
                    
                }).catch((error) => {
        
                });
            }).catch((error) => {
    
            });





        }
    
    }  
    roomFilters1() {

        // let database = firebase.database();
        // let that = this;

        // database.ref('rooms').orderByChild("isAR").equalTo(false).limitToFirst(6).once('value').then((snapshot) => {
        //     snapshot.forEach((childSnapShot) => {

                
        //         rooms.push({
        //             id:childSnapShot.key,
        //             date:childSnapShot.val().date,
        //             ...childSnapShot
        //         });


        //     });
        //     this.setState({roomsLoaded:true});
        //     let lastRoom = rooms.length;
        //     console.log('last room', rooms[lastRoom - 1])
        //     this.setState({lastRoom:lastRoom});
        //     rooms = [];   
        // });
        
    }
    roomFilters2() {
        // let database = firebase.database();
        // let that = this;
        // database.ref('rooms').orderByChild('date').limitToFirst(6).once('value').then((snapshot) => {
        //     snapshot.forEach((childSnapShot) => {
        //         rooms.push({
        //             id:childSnapShot.key,
        //             date:childSnapShot.val().date,
        //             ...childSnapShot
        //         });
        //     });
        //     this.setState({roomsLoaded:true});
        //     let lastRoom = rooms.length;
        //     console.log('last room', rooms[lastRoom - 1])
        //     this.setState({lastRoom:lastRoom});
        //     rooms = [];
            
        // });
    }

    nextPage() {
        // let database = firebase.database();
        // let that = this;
        // database.ref('rooms').orderByChild('date').limitToLast(6).startAt(this.state.lastRoom).once('value').then((snapshot) => {
        //     snapshot.forEach((childSnapShot) => {
        //         rooms.push({
        //             id:childSnapShot.key,
        //             date:childSnapShot.val().date,
        //             ...childSnapShot
        //         });
        //     });
        //     this.setState({roomsLoaded:true});
        //     let lastRoom = rooms.length;
        //     console.log('last room', rooms[lastRoom - 1])
        //     this.setState({lastRoom:lastRoom});
        //     rooms = [];
            
        // });
    }
    render() {
     
        //if(this.state.hasName === 'found') {
    
        return (
            <div style={{height:'100%',
                display:'flex',
                flexDirection:'column',
                flex: 1
                }}>
                <div className="profile-main">
                    <div className="profile-info">
                        <div style={{height:'80px',width:'80px'}}>
                            <div className="profile-pic" style={{
                                backgroundImage:`url(${this.state.pic})`,
                                backgroundRepeat:'no-repeat',
                                backgroundSize:'cover',
                                backgroundPosition:'center'
                                }}>
                            </div>
                        </div>
                        <div className="profile-top-section-bottom-section-wrap">
                            <div className="name-badge-follow-wrap">
                                <div className="name-badge-follow">
                                    <p className="profile-name-profile">{this.state.name}</p>
                                    <div style={{display:this.state.verified,height:'14px',width:'14px'}}>
                                        <div className="profile-verified"></div>
                                    </div>
                                    <button onClick={this.follow.bind(this)} className="profile-follow-button" style={{display:this.state.displayIfOwn}}>{this.state.followlbl}</button>
                                </div>
                                <div className="profile-followers">
                                    <div><p className="profile-follower-num">{this.state.followersNum} Followers</p></div>
                                    <div style={{marginLeft:16}}><p style={{fontSize:13, fontWeight:600}}>{this.state.followingNum} Following</p></div>
                                </div>
                            </div>

                            <div className="bio-info">
                                <p style={{fontSize:14}}>{this.state.bio}
                                </p>
                            </div>
                        </div>

                    </div>            
                </div>  
                <div style={{
                    padding:'30px 20px',
                    height:'100%'
                }}>
            <ReactResizeDetector
  handleWidth
  handleHeight
  render={({ width, height }) => (
             <div style={{padding:'0px 10px', height:'100%'}}>
                    <div id="body-padding" style={{
                        flex:1
                    }}></div>
             <section style={{flex:1}}>
                            <div className="main" style={{flex:1, height:'100%'}}>
                            
                                <div style={{position:'relative', height:'100%'}}>

                                    
                                            <StackGrid
                                            id={'test'}
                                            style={{position:'relative'}}
                                            columnWidth={width <= 768 ? '100%' : '33.33%'}
                                            gutterWidth={20}
                                            gutterHeight={20}
                                            horizontal={false}
                                          >
                        {
                            
                            rooms.map((i)=> {
                                
                                if(i.isRemixable === true) {
                                    return (<div><RoomPost id={i} 
                                        description={i.description} 
                                        isRemixable={i.isRemixable}
                                        postedPicURL={i.postedPicURL}
                                        roomType={i.roomType}
                                        pic={i.pic}
                                        roomHeight={'auto'}
                                        username={i.username}
                                        key={i}
                                    />
                                    </div>)
                                } 
                                if (i.roomType === 'image') {
                                    return (<div><RoomPost id={i} 
                                        description={i.description} 
                                        isRemixable={i.isRemixable}
                                        postedPicURL={i.postedPicURL}
                                        roomType={i.roomType}
                                        pic={i.pic}
                                        roomHeight={'auto'}
                                        username={i.username}
                                        key={i}
                                    /></div>)
                                } 
                                if (i.roomType === 'other') {
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
                                if (i.roomType === 'text') {
                                    return (<div><RoomPost id={i} 
                                        description={i.description} 
                                        isRemixable={i.isRemixable}
                                        postedPicURL={i.postedPicURL}
                                        roomType={i.roomType}
                                        pic={i.pic}
                                        roomHeight={'340px'}
                                        username={i.username}
                                        key={i}
                                    /></div>)
                                } 
                              
                                })
                        }
                                          </StackGrid>
                                      
                                
                                </div> 
                            </div>   
            
                        </section>
                        </div>
  )}/>
                    <nav className="pagination-buttons-wrap">
                        <a href="" className="pagination-button">Previous Page</a>
                        <a href="" className="pagination-button">Next Page</a>
                    </nav>
                </div>
            </div>
        )
    

    }
}
export default sizeMe()(ProfilePage);
