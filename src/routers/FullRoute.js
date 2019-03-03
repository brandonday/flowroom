import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const FullRoute = ({isAuthenticated, component:Component, ...rest}) => (
    <Route {...rest} component={(props)=> {

            return (<Component {...props}/>)

    }}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated:state.isLoggedIn.isLoggedIn
});

export default connect(mapStateToProps)(FullRoute)
