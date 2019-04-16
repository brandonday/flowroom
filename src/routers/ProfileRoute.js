import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Components/Home/Header';
import Footer from '../Components/Home/Footer';
import { firebase } from '../Components/firebase/firebase';
import createHistory from 'history/createBrowserHistory';

let history = createHistory();

export const ProfileRoute = ({isAuthenticated, component:Component, ...rest}) => (
    <Route {...rest} component={(props) => {
        let profileExists = true;  
   
        // firebase.database().ref('/rooms/MLIOHO').once('value').then(function(snapshot) {
        
            
       

              
              return  (<div style={{display:'flex', flex:1, flexDirection:'column'}}>
                <Header/>
                    <Component {...props}/>
                <Footer/>
                </div>) 
              
        // }).catch((error) => {
        //     alert(error.message)
        // })
          


    }}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated:state.isLoggedIn.isLoggedIn
});

export default connect(mapStateToProps)(ProfileRoute)