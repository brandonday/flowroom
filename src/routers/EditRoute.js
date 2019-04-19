import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import HeaderLoggedOut from '../Components/Home/HeaderLoggedOut';
import HeaderLoggedIn from '../Components/Home/HeaderLoggedIn';
import Footer from '../Components/Home/Footer';
import createHistory from 'history/createBrowserHistory';
import { firebase } from '../Components/firebase/firebase';
import { userPathStore } from '../actions/authentication';

let history = createHistory();

export const EditRoute = ({ isAuthenticated, username, component:Component, ...rest}) => {
    //let usernameAuth = 'brando';
   
    return(<Route {...rest} component={(props) => {
   
       
        
       
        // if(usernameAuth === 'brando') {
        //      return (
        //         <div style={{display:'flex', flex:1, flexDirection:'column'}}>
        //         <HeaderLoggedIn/>
        //             <Component {...props}/>
        //         {/* <Footer/> */}
        //         </div>
        //     )

        // } else {
        //     //history.push('/');
        //     return(<div>
        //         <h1>not found</h1>
        //     </div>)
        // } 
         
    }}/>)


};

// const mapStateToProps = (state, ownProps) => ({
//     isAuthenticated:state.isLoggedIn.isLoggedIn,
//     username:state.auth.username,
//     props:ownProps
// });


export default EditRoute //connect(mapStateToProps)()