import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import HeaderLoggedOut from '../Components/Home/HeaderLoggedOut';
import HeaderLoggedIn from '../Components/Home/HeaderLoggedIn';
import Footer from '../Components/Home/Footer';
import { userExists } from '../actions/authentication';
import { firebase } from '../Components/firebase/firebase';

export const PrivateRoute = ({isAuthenticated, userExists, component:Component, ...rest}) => (
    <Route {...rest} component={(props)=> {
        
        if(isAuthenticated) {
             return (
                <div style={{display:'flex', flex:1, flexDirection:'column'}}>
                <HeaderLoggedIn/>
                    <Component {...props}/>
                {/* <Footer/> */}
                </div>
            )
        } else if(!isAuthenticated) {
            return  (<div style={{display:'flex', flex:1, flexDirection:'column'}}>

                <HeaderLoggedOut/>
                <Component {...props}/>
                {/* <Footer/> */}
            </div>)
        } 

    }}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated:state.isLoggedIn.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
    userExists: (user) => dispatch(userExists(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)