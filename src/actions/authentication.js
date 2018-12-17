
import { firebase } from '../Components/firebase/firebase';

export const logIn = (text = '') => ({
   
});


//default param for destructered object passed as argument if nothing is set for isSignUpSuccess is false
//otherwise its whatever was passsed and then the object is returned with shorthand

export const isLoggedIn = ({ isLoggedIn } = {}) => ({
    type: 'IS_LOGGED_IN',
    isLoggedIn
});

export const createAccount = (email, password) => {
    return () => {
        let emailAddr = email;
        let userPassword = password;
        return firebase.auth().createUserWithEmailAndPassword(emailAddr, userPassword);
    }
}

export const userStore = ({ 
        username = '',
        pic = ''
    } = {}) => ({
        type: 'USERSTORE',
        username,
        pic
});

export const userPathStore = ({ 
    usernamePath = '',
    usernameAuth = ''
} = {}) => ({
    type: 'USERPATHNAME',
    usernamePath,
    usernameAuth
});

export const userExists = ({ 
    userExists
} = {}) => ({
    type: 'USEREXISTS',
    userExists
});



export const loginAccount = (email, password) => {
    return () => {
        let emailAddr = email;
        let userPassword = password;
        return firebase.auth().signInWithEmailAndPassword(emailAddr, userPassword);
    }
}

export const logout = () => ({
    type:'LOGOUT'
});

export const logOut = () => {
    return () => {
        return firebase.auth().signOut();
    }
}