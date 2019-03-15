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

let rooms = [];
let roomsFilter = [];

class ProfilePage extends Component {
    constructor() {
        super();
        this.state = {
            hasName:'',
            myusername:'',
            loading:(<div style={{display:'flex',flex:'1'}}>loading...</div>),
            name:'',
            bio:'sddssdssdsdsd',
            pic:'',
            displayIfOwn:'none',
            followlbl:'follow',
            followersNum:0,
            followingNum:0,
            verified:'none',
            roomsLoaded:false,
            lastRoom:'',
            commmunitiesFilter:{},
            filters:{},
            roomFilters:{},
            mobile:false
        }
    }
    componentDidMount() {
        let database = firebase.database();
        let name = this.props.match.params.id.toLowerCase();
        //let getRooms = (filtering) => {
            database.ref(`UsersRooms/${name}/`).orderByChild('date').limitToFirst(6).once('value').then((snapshot) => {
                //alert(`categorizations/${regular}${allres}${mobile}${tablet}${desktop}${live}${remixable}${aiType}${arType}${vrType}${three60Type}`)
                snapshot.forEach((childSnapShot) => {
                    if(rooms.length != 6) {
                       
                   
                    rooms.push({
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
                        ...childSnapShot
                    });
    
                }
    
                });
                this.setState({roomsLoaded:true});
                let lastRoom = rooms.length;
                console.log('last room', rooms[lastRoom - 1])
                this.setState({lastRoom:lastRoom});
                //if(filtering === true) {
                    //rooms = []; 
                //}
                
            });
          //}
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
     
        if(this.state.hasName === 'found') {
    
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
                    padding:'30px 20px'
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
                            <div className="main" style={{flex:1}}>
                            
                                <div style={{position:'relative'}}>

                                    
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
                                        roomHeight={'auto'}
                                        username={i.username}
                                        key={i}
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
    } else {
        return (this.state.loading)
        
    }

    }
}
export default sizeMe()(ProfilePage);
