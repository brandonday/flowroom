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

class RoomPosts extends Component {
    constructor() {
        super();
        this.state = {
            roomsLoaded:false,
            lastRoom:'',
            commmunitiesFilter:{},
            filters:{},
            roomFilters:{}
        }
    }
    componentDidMount() {
        let database = firebase.database();
        let that = this;
        database.ref('rooms').orderByChild('date').limitToFirst(6).once('value').then((snapshot) => {
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
                    ...childSnapShot
                });

            }

            });
            this.setState({roomsLoaded:true});
            let lastRoom = rooms.length;
            console.log('last room', rooms[lastRoom - 1])
            this.setState({lastRoom:lastRoom});
           //alert(rooms)
            //rooms = []; 
            
        });
        // const unsubscribe = Store.subscribe(()=>{
        //    rooms.forEach((room) => {
        //         //if you query and get results equal to that then push
        //         //otherwise search for it
        //         //if room.isAR item is not eq roomsFilters state (true cause i clicked) query db
        //         if(room.isAR === Store.getState().roomsFilters.ar) {
        //             //alert(Store.getState().roomsFilters.ar)
        //             roomsFilter.push(room)
        //             //possibly dont push anything since already exist
        //         } else {

        //             //going to be slow if keep querying 
                       
        //             let database = firebase.database();
        //             let that = this;
        //             let num = rooms.length - roomsFilter.length;
        //             database.ref('rooms').orderByChild('date').limitToLast(num).startAt(this.state.lastRoom).once('value').then((snapshot) => {
        //                 snapshot.forEach((childSnapShot) => {
        //                     rooms.push({
        //                         id:childSnapShot.key,
        //                         date:childSnapShot.val().date,
        //                         ...childSnapShot
        //                     });
        //                 });
        //                 this.setState({roomsLoaded:true});
        //                 let lastRoom = rooms.length;
        //                 console.log('last room', rooms[lastRoom - 1])
        //                 this.setState({lastRoom:lastRoom});
        //                 rooms = [];
            
        //             });

        //         }
                
        //    });
        //    rooms = [...roomsFilter];
        //    //alert(rooms.length)
        
           
        // });        

        
    }
    getRooms() {
        alert('d')
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
        const { 
            size: { 
              width
            } 
          } = this.props;
      
        if(this.state.roomsLoaded) {    
            let theHeight;
            return  (
                <div style={{display:'flex'}}>
                    <div style={{overflow:'hidden',
                        padding:'0 10px',
                        minHeight:'100%',
                        flex:1
                    }}>
                        <section style={{flex:1}}>
                            <div className="main" style={{flex:1}}>
                                <div style={{display:'flex', flex:1, flexWrap:'wrap', justifyContent:'space-between', margin:'20px 0px 20px auto',fontSize:'16px'}}>
                                    <Nav/>
                                    <RoomFilters/>
                                </div>
                                <div style={{textAlign:'center', width:'98%'}}>
                                    
                                            <StackGrid
                                            columnWidth={width <= 768 ? '100%' : '33.33%'}
                                            gutterWidth={10}
                                            gutterHeight={20}
                                            horizontal={false}
                                          >
                        {
                            
                            rooms.map((i)=> {
                                
                                if(i.isRemixable === true) {
                                    return ( <RoomPost id={i} 
                                        description={i.description} 
                                        isRemixable={i.isRemixable}
                                        postedPicURL={i.postedPicURL}
                                        roomType={i.roomType}
                                        pic={i.pic}
                                        roomHeight={'auto'}
                                    />)
                                } 
                                if (i.roomType === 'image') {
                                    return ( <RoomPost id={i} 
                                        description={i.description} 
                                        isRemixable={i.isRemixable}
                                        postedPicURL={i.postedPicURL}
                                        roomType={i.roomType}
                                        pic={i.pic}
                                        roomHeight={'auto'}
                                    />)
                                } 
                                if (i.roomType === 'other') {
                                    return ( <RoomPost id={i} 
                                        description={i.description} 
                                        isRemixable={i.isRemixable}
                                        postedPicURL={i.postedPicURL}
                                        roomType={i.roomType}
                                        pic={i.pic}
                                        roomHeight={'auto'}
                                    />)
                               }   
                                if (i.roomType === 'text') {
                                    return ( <RoomPost id={i} 
                                        description={i.description} 
                                        isRemixable={i.isRemixable}
                                        postedPicURL={i.postedPicURL}
                                        roomType={i.roomType}
                                        pic={i.pic}
                                        roomHeight={'340px'}
                                    />)
                                } 
                              
                                })
                        }
                                          </StackGrid>
                                      
                                
                                </div> 
                            </div>   
            
                        </section>
                        <nav  style={{flex:1}} className="pagination-buttons-wrap">
                            <a href="" className="pagination-button"><span style={{display:'inline-block', background: "url('/images/sprite.png') no-repeat", overflow:'hidden',textIndent:'-9999px', textAlign:'left',backgroundSize:'89px 248px',backgroundPosition:'-75px -184px',width:'10px',height:'18px', marginRight:'15px', transform: 'rotate(179deg)'}}></span>Previous Page</a>
                            <a href="" onClick={this.roomFilters1.bind(this)} className="pagination-button">Next Page<span style={{display:'inline-block', background: "url('/images/sprite.png') no-repeat", overflow:'hidden',textIndent:'-9999px', textAlign:'left',backgroundSize:'89px 248px',backgroundPosition:'-75px -184px',width:'10px',height:'18px',marginLeft:'15px'}}></span></a>
                        </nav>
                    </div>
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


const ConnectedRoomPosts = connect(undefined)(RoomPosts)

export default sizeMe()(ConnectedRoomPosts);
  