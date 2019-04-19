import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Components/Home/Header';
import Footer from '../Components/Home/Footer';
import { userExists } from '../actions/authentication';
import { firebase } from '../Components/firebase/firebase';

export const PrivateRoute = ({isAuthenticated, userExists, component:Component, ...rest}) => (
    <Route {...rest} component={(props)=> {
        
        if(isAuthenticated) {
             return (
                <div style={{display:'flex', flex:1, flexDirection:'column'}}>
                <Header isLoggedIn={true}/>
                    <Component {...props}/>
                {/* <Footer/> */}
                </div>
            )
        } else if(!isAuthenticated) {
            return  (<div style={{display:'flex', flex:1, flexDirection:'column'}}>

                <Header isLoggedIn={false}/>
                <Component {...props}/>
                {/* <Footer/> */}
            </div>)
        } 

    }}/>
);

// const mapStateToProps = (state) => ({
//     isAuthenticated:state.isLoggedIn.isLoggedIn
// });

// const mapDispatchToProps = (dispatch) => ({
//     userExists: (user) => dispatch(userExists(user))
// })

export default PrivateRoute //connect(mapStateToProps, mapDispatchToProps)()