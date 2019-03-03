import React, { Component } from 'react';
import RoomPosts from './RoomPosts.js';
import Communities from './Communities.js';
import Footer from './Footer.js';
import AppModal from './AppModal';
import { firebase } from '../firebase/firebase';
import createHistory from 'history/createBrowserHistory';

let history = createHistory();

 class Main extends Component {
        constructor() {
                super();
        }
        render() {
                return  (
                        <div style={{flex:1,display:'flex',
                                flexDirection:'column',background:'#141414'}}>
                                <Communities/>
                                <RoomPosts/>
                                <AppModal/>
                        </div>
                )

        }
       
 }


  
export default Main;