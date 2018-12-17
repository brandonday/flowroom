import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import HeaderLoggedOut from '../Components/Home/HeaderLoggedOut';
import HeaderLoggedIn from '../Components/Home/HeaderLoggedIn';
import Footer from '../Components/Home/Footer';

export const FullRoute = ({isAuthenticated, component:Component, ...rest}) => (
    <Route {...rest} component={(props)=> {
        
            return (<Component {...props}/>)

    }}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated:state.isLoggedIn.isLoggedIn
});

export default connect(mapStateToProps)(FullRoute)