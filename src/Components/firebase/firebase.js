import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC-ragZHIGaq2dt0Epqiu1_7mPJPg7MQIs",
    authDomain: "flowroom-fd862.firebaseapp.com",
    databaseURL: "https://flowroom-fd862.firebaseio.com",
    projectId: "flowroom-fd862",
    storageBucket: "flowroom-fd862.appspot.com",
    messagingSenderId: "631544722196"
  };


  firebase.initializeApp(config);

  const database = firebase.database();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const createUserEmail = new firebase.auth();
  export { firebase, createUserEmail, database as default }