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

        store.subscribe(() => {
            console.log(store.getState());
           // this.setState({roomsLoaded:false});


            let isProduction;
            let isUnlisted;
            let isPrivate;

            let isWeb;
            let isNative;
            let isWebNative;
            //let isAllRes = store.getState().roomsFilters.all;
            let isMobile = store.getState().roomsFilters.mobile;
            let isTable = store.getState().roomsFilters.tablet;
            let isDesktop = store.getState().roomsFilters.desktop;
            let isLive = store.getState().roomsFilters.live;
            let isRemixable = store.getState().roomsFilters.remixable;
            let isAI = store.getState().roomsFilters.ai;
            let isAR = store.getState().roomsFilters.ar;
            let isVR = store.getState().roomsFilters.vr;
            let is360 = store.getState().roomsFilters.three60;

            let regular = '';
            let allres = '';
            let live = '';
            let remixable = '';
            let aiType = '';
            let arType = '';
            let vrType = '';
            let three60Type = '';
            let mobile = '';
            let tablet = '';
            let desktop = '';
            let posttype = '';
            let isunlisted = '';
            let isprivate = '';

            let isweb = '';
            let isnative = '';
            let iswebnative = '';

            // if(isProduction === true ) {
              regular= 'Regular/';
            // } else {
            //   regular = 'Experimental/';
            // }




            if(isUnlisted === true) {
              isunlisted = 'Unlisted/';
              regular = '';
            } else {
              isunlisted = '';
            }

            if(isPrivate === true) {
              isprivate = 'Private/';
              regular = '';
            } else {
              isprivate = '';
            }

            if(isWeb === true) {
              isweb = 'Web/';
              regular = '';
            } else {
              isweb = '';
            }

            if(isNative) {
              isnative = 'Native/';
              regular = '';
            } else {
              isnative = '';
            }

            if(isWebNative) {
              iswebnative = 'WebNative/';
              regular = '';
            } else {
              iswebnative = '';
            }

            // if(isAllRes === true) {
            //   allres = ''
            //   //rooms = [];
            // } else {
            //   allres = '';
            //   //rooms = [];
            // }
            if(isMobile === true) {
              //regular = '';
              mobile = 'Mobile/'

            } else {
              mobile = '';
            }
            if(isTable === true) {
              //regular = '';
              tablet = 'Tablet/';
            } else {
              tablet = '';
            }
            if(isDesktop === true) {
              //regular = '';
              desktop = 'Desktop/';
            } else {
              desktop = '';
            }

            if(isLive === true) {
              //regular = '';
              live = 'Live/';
            } else {
              live = ''
            }

            if(isRemixable === true) {

              //regular = '';
              remixable = 'Remixable/';

              //getRooms();


            } else {
              remixable = ''
              //that.setState({rooms:rooms})


            }

            if(isAI === true) {
              aiType = 'AI/';

              getRooms();
              //rooms = [];
            } else {
              aiType = ''
            }

            if(isAR === true) {
              arType = 'AR/';

              getRooms();
              //rooms = [];
            } else {
              arType = ''
            }

            if(isVR === true) {
              vrType = 'VR/';

              getRooms();
              //rooms = [];
            } else {
              vrType = ''
            }

            if(is360 === true) {
              three60Type = '360/';

              getRooms();
              //rooms = [];
            } else {
              three60Type = ''
            }
            let lastRoom;


            getRooms();

            let that = this;

            function getRooms() {

                //alert(`categorizations/${regular}${mobile}${tablet}${desktop}${live}${remixable}${aiType}${arType}${vrType}${three60Type}`)
                // let stringSel = `categorizations/${regular}${mobile}${tablet}${desktop}${live}${remixable}${aiType}${arType}${vrType}${three60Type}`;
                database.ref(`categorizations/${regular}${mobile}${tablet}${desktop}${live}${remixable}${aiType}${arType}${vrType}${three60Type}`).limitToFirst(7).once('value').then((snapshot) => {

                    snapshot.forEach((childSnapShot) => {

                        if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
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
                                shortID:childSnapShot.val().shortID,
                                ...childSnapShot
                            });



                        }
                    }


                    });

                    that.setState({rooms:rooms})
                    that.setState({roomsLoaded:true});
                    let lastRoomNum = rooms.length;
                    that.setState({lastRoomNum:lastRoomNum - 1});
                    that.setState({lastRoom:lastRoom});
                    //if(filtering === true) {


                    rooms = [];

                    //}




                });
                console.log('cake',rooms)


            }
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
        store.dispatch({type:'SAVE_DHTML', html:'',css:'',js:''});


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


    prevPage() {
        let database = firebase.database();
        let that = this;
        let regular = '';
            let allres = '';
            let live = '';
            let remixable = '';
            let aiType = '';
            let arType = '';
            let vrType = '';
            let three60Type = '';
            let mobile = '';
            let tablet = '';
            let desktop = '';
            let posttype = '';
            let isunlisted = '';
            let isprivate = '';

            let isweb = '';
            let isnative = '';
            let iswebnative = '';

            // if(isProduction === true ) {
              regular= 'Regular/';
            // } else {
            //   regular = 'Experimental/';
            // }




            // if(isUnlisted === this.state.isUnlisted) {
            //   isunlisted = 'Unlisted/';
            // } else {
            //   isunlisted = '';
            // }

            // if(isPrivate === this.state.isPrivate) {
            //   isprivate = 'Private/';
            // } else {
            //   isprivate = '';
            // }

            // if(isWeb === this.state.isWeb) {
            //   isweb = 'Web/';
            // } else {
            //   isweb = '';
            // }

            // if(isNative === this.state.isNative) {
            //   isnative = 'Native/';
            // } else {
            //   isnative = '';
            // }

            // if(isWebNative === this.state.isWebNative) {
            //   iswebnative = 'WebNative/';
            // } else {
            //   iswebnative = '';
            // }

    /*pagination must use state */
            if(this.state.isAllRes === true) {
              allres = ''
            } else {
              allres = '';
            }
            if(this.state.isMobile === true) {
              mobile = 'Mobile/'

            } else {
              mobile = '';
            }
            if(this.state.isTable === true) {
              tablet = 'Tablet/'

            } else {
              tablet = '';
            }
            if(this.state.isDesktop === true) {
              desktop = 'Desktop/'

            } else {
              desktop = '';
            }

            if(this.state.isLive === true) {
              live = 'Live/'

          } else {
              live = ''
          }

          if(this.state.isRemixable === true) {
              remixable = 'Remixable/'

          } else {
              remixable = ''

          }

          if(this.state.isAI === true) {
              aiType = 'AI/'

          } else {
              aiType = ''
          }

          if(this.state.isAR === true) {
              arType = 'AR/'

          } else {
              arType = ''
          }

          if(this.state.isVR === true) {
              vrType = 'VR/'

          } else {
              vrType = ''
          }

          if(this.state.is360 === true) {
              three60Type = '360/'

          } else {
              three60Type = ''
          }

        database.ref(`categorizations/${regular}${mobile}${tablet}${desktop}${live}${remixable}${aiType}${arType}${vrType}${three60Type}`).orderByChild('shortID').limitToLast(7).endAt(this.state.firstRoom).once('value').then((snapshot) => {
            snapshot.forEach((childSnapShot) => {

                //if(rooms.length != 7) {
            if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
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
                        shortID:childSnapShot.val().shortID,
                        ...childSnapShot
                    });

                }
                //alert(childSnapShot.val().shortID)
            //}
            }

            });
            //if(rooms.length != 1) {
                this.setState({rooms:rooms});
                this.setState({roomsLoaded:true});
                let lastRoomNum = rooms.length;
                this.setState({lastRoomNum:lastRoomNum - 1});
                this.setState({lastRoom:rooms[lastRoomNum - 1].shortID});
                this.setState({firstRoom:rooms[0].shortID});

                //if(filtering === true) {

                    rooms = [];

                //}
            //}

        });
    }
    nextPage() {
        let database = firebase.database();
        let that = this;
        let regular = '';
        let allres = '';
        let live = '';
        let remixable = '';
        let aiType = '';
        let arType = '';
        let vrType = '';
        let three60Type = '';
        let mobile = '';
        let tablet = '';
        let desktop = '';
        let posttype = '';
        let isunlisted = '';
        let isprivate = '';

        let isweb = '';
        let isnative = '';
        let iswebnative = '';

        // if(isProduction === true ) {
          regular= 'Regular/';
        // } else {
        //   regular = 'Experimental/';
        // }




        // if(isUnlisted === this.state.isUnlisted) {
        //   isunlisted = 'Unlisted/';
        // } else {
        //   isunlisted = '';
        // }

        // if(isPrivate === this.state.isPrivate) {
        //   isprivate = 'Private/';
        // } else {
        //   isprivate = '';
        // }

        // if(isWeb === this.state.isWeb) {
        //   isweb = 'Web/';
        // } else {
        //   isweb = '';
        // }

        // if(isNative === this.state.isNative) {
        //   isnative = 'Native/';
        // } else {
        //   isnative = '';
        // }

        // if(isWebNative === this.state.isWebNative) {
        //   iswebnative = 'WebNative/';
        // } else {
        //   iswebnative = '';
        // }

        if(this.state.isAllRes === true) {
          allres = ''
        } else {
          allres = '';
        }
        if(this.state.isMobile === true) {
          mobile = 'Mobile/'
        } else {
          mobile = '';
        }
        if(this.state.isTable === true) {
          tablet = 'Tablet/'
        } else {
          tablet = '';
        }
        if(this.state.isDesktop === true) {
          desktop = 'Desktop/'
        } else {
          desktop = '';
        }

        if(this.state.isLive === true) {
          live = 'Live/'
        } else {
          live = ''
        }

        if(this.state.isRemixable === true) {
          remixable = 'Remixable/'
        } else {
          remixable = ''
        }

        if(this.state.isAI === true) {
          aiType = 'AI/'
        } else {
          aiType = ''
        }

        if(this.state.isAR === true) {
          arType = 'AR/'
        } else {
          arType = ''
        }

        if(this.state.isVR === true) {
          vrType = 'VR/'
        } else {
          vrType = ''
        }

        if(this.state.is360 === true) {
          three60Type = '360/'
        } else {
          three60Type = ''
        }
        //alert(this.state.lastRoom)
        database.ref(`categorizations/${regular}${mobile}${tablet}${desktop}${live}${remixable}${aiType}${arType}${vrType}${three60Type}`).orderByChild('shortID').startAt(this.state.lastRoom).limitToFirst(6).once('value').then((snapshot) => {
            snapshot.forEach((childSnapShot) => {
                if(!(childSnapShot.key === 'Mobile' || childSnapShot.key === 'Remixable')) {
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
                            shortID:childSnapShot.val().shortID,
                        ...childSnapShot
                    });


                //alert(childSnapShot.val().shortID)
                }

            }

            });
                this.setState({rooms:rooms})
                this.setState({roomsLoaded:true});
                let lastRoomNum = rooms.length;
                this.setState({lastRoomNum:lastRoomNum - 1});
                this.setState({lastRoom:rooms[lastRoomNum - 1].shortID});
                this.setState({firstRoom:rooms[0].shortID});

                console.log('rooom thing',rooms[0])
                //if(filtering === true) {

                    rooms = [];


                //}
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
                              console.log(i)
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
                                  console.log(i);
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
                        {/* <nav  style={{flex:1}} className="pagination-buttons-wrap">
                            <span onClick={this.prevPage.bind(this)} className="pagination-button"><span style={{display:'inline-block', background: "url('/images/sprite.png') no-repeat", overflow:'hidden',textIndent:'-9999px', textAlign:'left',backgroundSize:'89px 248px',backgroundPosition:'-75px -184px',width:'10px',height:'18px', marginRight:'15px', transform: 'rotate(179deg)'}}></span>Previous Page</span>
                            <span onClick={this.nextPage.bind(this)} className="pagination-button">Next Page<span style={{display:'inline-block', background: "url('/images/sprite.png') no-repeat", overflow:'hidden',textIndent:'-9999px', textAlign:'left',backgroundSize:'89px 248px',backgroundPosition:'-75px -184px',width:'10px',height:'18px',marginLeft:'15px'}}></span></span>
                        </nav> */}
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
