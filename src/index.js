import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, Switch, Link} from 'react-router-dom';

import validator from 'validator';
import Main from './Components/Home/Main.js';
import Room from './Components/Home/Room.js';
import Community from './Components/Home/Community.js';
import NotFound from './Components/Home/NotFound.js';
import ProfilePage from './Components/Home/ProfilePage.js';
import SignUp from './Components/Home/SignUp.js';
import Login from './Components/Home/Login.js';
import About from './Components/Home/About.js';
import Profile from './Components/Home/Profile.js';
import Full from './Components/Home/full.js';
import PhotoEditor from './Components/Home/PhotoEditor.js';
import reduxIt from './redux.js';
import './Components/styles/stylesheet.css';
import 'normalize.css/normalize.css';
import { createRoom } from './actions/rooms';
import { setFilters } from './actions/filters';
import { OPEN_MODAL } from './actions/entireApp';
import { isLoggedIn } from './actions/authentication';
import { logout } from './actions/authentication';
import { firebase } from './Components/firebase/firebase';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './routers/PrivateRoute';
import EditRoute from './routers/EditRoute';
import FullRoute from './routers/FullRoute';
import ProfileRoute from './routers/ProfileRoute.js';
import Footer from './Components/Home/Footer.js';
import { userStore } from './actions/authentication';
import { updateEditor, calledAlready } from './actions/updateEditor';
import { Store } from './Components/Home/store.js';

const store = Store;


//store.dispatch(createRoom({description:'new room'})) //when you send to the store ths object with type the rudcer for that type will run


document.getElementById('default-modal').addEventListener('click', ()=>{

    document.getElementById('default-modal').style.display = 'none';
    document.getElementById('create-box').style.display = 'none';
});


store.dispatch({type:'SAVE_DHTML', html:'',css:'',js:''});


const history = createHistory();
let p = false
const Routes = () => (

    <Router history={history}>
     <div className="content">
        <Switch>
            <PrivateRoute exact path="/" component={Main}></PrivateRoute>
            {/* <PrivateRoute exact path="/editor" component={PhotoEditor}></PrivateRoute> */}
            <PrivateRoute path="/room/:user/:id" component={Room}></PrivateRoute>
            <PrivateRoute exact path="/room/:id" component={Room}></PrivateRoute>
            <PrivateRoute exact path="/room/" component={Room}></PrivateRoute>
            <FullRoute path="/full/:id" component={Full}></FullRoute>
            <FullRoute path="/full/" component={Full}></FullRoute>
            <PrivateRoute path="/community" component={Community}></PrivateRoute>
            <PrivateRoute exact path="/signup" component={SignUp}></PrivateRoute>
            <PrivateRoute path="/login" component={Login}></PrivateRoute>
            <PrivateRoute path="/about" component={About}></PrivateRoute>
            <PrivateRoute exact path="/:id" component={ProfilePage}></PrivateRoute>
            <EditRoute exact path="/:id/edit" component={Profile}></EditRoute>

            <PrivateRoute component={NotFound}></PrivateRoute>
        </Switch>
        </div>
    </Router>
)

const jsx = (
    <Provider store={store}>
        <div style={{display:'flex',flex:1, flexDirection:'column'}}>
            <Routes/>
        </div>
    </Provider>
)



window.callUpdate = function(before, updateHTML, updateCSS, updateJS) {
    store.dispatch(updateEditor({before:before, updateHTML:updateHTML, updateCSS:updateCSS, updateJS:updateJS}));
}

window.calledAlready = function(bool, before) {
    //alert(bool);
    store.dispatch(calledAlready({calledAlready:bool}));
    //store.dispatch(updateEditor({before:before}));

}
let hasRendered = false;
const renderApp = () => {
  /*conditional here. if path is / or any path names then*/
  /*are params just easy way get whats after the forward slash
  and didnt page rely on firebase checking users anyway*/

  /*problem is I want to be able to not need to get params from each
  page and ths might be fine. It'll render normal no matter what. how
  do I know if the behavior is fine*/
//   let name = window.location.pathname;
//   name = name.replace(/\//g, "");
//   name = name.substr(0, name.lastIndexOf("/"));

  //remove anything after foward slash too pop
  //wont event begin using firebase for normal routes so its the same
//   if(!( name == '' || name == '/' || name == 'room' ||
//     name == 'full' || name == 'about' || name == 'signup' ||
//     name == 'login' || name == 'brandondedit'
//   )) {
//   let ref = firebase.database().ref("users");

//   ref.once("value")
//     .then((snapshot) => {
//       let hasName = snapshot.hasChild(`${name}`); // true

//       if(hasName) {
//         ReactDOM.render([jsx], document.getElementById('root'));
//       } else  {
//         ReactDOM.render(<div><h1>not found</h1></div>, document.getElementById('root'));
//       }
//     });
//   } else {

    if(hasRendered === false) {
        ReactDOM.render([jsx], document.getElementById('root'));
        hasRendered = true;
     }


  }


        //render normal showing Profile componenet

//renderApp();
firebase.auth().onAuthStateChanged((user)=> {
    console.log("firebase.auth user: ",user);
    if(user) {
        if(hasRendered === false) {
            renderApp();
            hasRendered = true;
         }
        //history.push('/');
        store.dispatch(isLoggedIn({isLoggedIn:true}));
        store.dispatch(userStore({username:user.displayName}));
    } else {
        //hasRendered = false;
        store.dispatch(logout());
        if(hasRendered === false) {
            renderApp();
            hasRendered = true;
        }
        // TODO: error message
        store.dispatch(userStore({username:null}));
        store.dispatch(isLoggedIn({isLoggedIn:false}))
    }
});
