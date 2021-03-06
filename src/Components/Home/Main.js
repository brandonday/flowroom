import React, { Component } from 'react';
import RoomPosts from './RoomPosts.js';
import Communities from './Communities.js';
import Footer from './Footer.js';
import AppModal from './AppModal';
import Create from './Create';
import { firebase } from '../firebase/firebase';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';


let history = createHistory();

 class Main extends Component {
        constructor() {
                super();
                this.state = {
                        showMenu:false
                }
        }
        
        render() {
                return  (
                        <div style={{flex:1,display:'flex',
                                flexDirection:'column',background:'#151515',}}>
                                  
                                <Communities/>
                                <RoomPosts/>
                                <AppModal/>
                                <Create/>
                        </div>
                )

        }
       
 }


      const ConnectedMain = connect((state) => {
        return {
          state:state
        }
      })(Main)
      
    
    export default ConnectedMain;
