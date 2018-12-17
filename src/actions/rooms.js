import uuid from 'uuid';
import { firebase } from '../Components/firebase/firebase';
import createHistory from 'history/createBrowserHistory';

//ACTION GENERATORS
// Dont forget the shorthand arrow means returns => automatically 
//its a pure function so output depends on input just returns it
const database = firebase.database();
const history = createHistory();

export const createRoom = (room) => ({
    type: 'CREATE_ROOM',
    room
});



export const startCreateRoom = (roomData = {}) => {
    return (dispatch) => {
        const {
            description = '', 
            views = 0, 
            likes = 0, 
            html = null,
            css = null,
            js = null,
            pic = '',
            objectNum = 0,
            date,
            filterGroup = '',
            Category = '',
            communityApartOf = '',
            codedBy = '', //objects like arrays
            ideaBy = '', //
            likedBy = '',
            remixedBy = '',
            sharedBy = '',
            tags = '',
            live = '',
            roomState = '',
            banned = '',
            objects = '',
            preferences = '',
            javascriptLibraries = '',
            HTML_Libraries = '',
            CSS_Style = '',
            flaggedNumber = '',
            report = '',
            isRemixable = false,
            isLive = false,
            isAR = false,
            isVR = false,
            is360 = false,
            isAI = false,
            isDesktop = false,
            isTable = false,
            isMobile = false,
            isAllRes = false,
            isProduction = false,
            isObject = false,
            upvotes = 0,
            downvotes = 0,
            isLocked = false,
            ipAddress = '',
            Name = '',
            browserCompatability = '', //objects like arrays,
            isUnlisted = false,
            isPrivate = false,
            isNSFW = false,
            isVerified = false,
            isDeveloper = false,
            isNormalUser = false,
            userName,
            emailAddress,
            shortID,
            permissions = {},
            uid = null,
            postedPicURL = '',
            roomType = '',
            thumbnail = '',
            objectOptions = {},
            textPosted = '',
            roomPrivacy = '',
            compatability = '',
            performance = '',
            isWeb = false,
            isNative = false,
            isWebNative = false
        } = roomData;

        const room = {
            description, 
            views, 
            likes, 
            html,
            css,
            js,
            pic,
            objectNum,
            date,
            filterGroup,
            Category,
            communityApartOf,
            codedBy, //objects like arrays
            ideaBy, //
            likedBy,
            remixedBy,
            sharedBy,
            tags,
            live,
            roomState,
            banned,
            objects,
            preferences,
            javascriptLibraries,
            HTML_Libraries,
            CSS_Style,
            flaggedNumber,
            report,
            isRemixable,
            isLive,
            isAR,
            isVR,
            is360,
            isAI,
            isDesktop,
            isTable,
            isMobile,
            isAllRes,
            isProduction,
            isObject,
            upvotes,
            downvotes,
            isLocked,
            ipAddress,
            Name,
            browserCompatability, //objects like arrays,
            isUnlisted,
            isPrivate,
            isNSFW,
            isVerified,
            isDeveloper,
            isNormalUser,
            userName,
            emailAddress,
            shortID,
            permissions,
            uid,
            postedPicURL,
            roomType,
            thumbnail,
            objectOptions,
            textPosted,
            roomPrivacy,
            compatability,
            performance,
            isWeb,
            isNative,
            isWebNative,
        }
      
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              let regular = '';
              let allres = '';
              let live = '';
              let remixable = '';
              let aiType = '';
              let arType = '';
              let vrType = '';
              let three60Type = '';
              let mobile = '';
              let tablet = '';
              let desktop = '';
              let posttype = '';
              let isunlisted = '';
              let isprivate = '';
    
              let isweb = '';
              let isnative = '';
              let iswebnative = '';

              if(isProduction === true ) {
                regular= 'Regular/';
              } else {
                regular = 'Experimental/';
              }

              if(roomType === 'image') {
                posttype = 'Image/';
              } else if (roomType === 'text') {
                posttype = 'Text/';
              } else {
                posttype = 'Other/';
              }

              
              if(isUnlisted === true) {
                isunlisted = 'Unlisted/';
              } else {
                isunlisted = '';
              }

              if(isPrivate === true) {
                isprivate = 'Private/';
              } else {
                isprivate = '';
              }

              if(isWeb === true) {
                isweb = 'Web/';
              } else {
                isweb = '';  
              }
              
              if(isNative) {
                isnative = 'Native/';
              } else {
                isnative = '';
              }

              if(isWebNative) {
                iswebnative = 'WebNative/';
              } else {
                iswebnative = '';
              }

              if(isAllRes === true) {
                allres = 'All/'
              } else {
                allres = '';
              } 
              if(isMobile === true) {
                mobile = 'Mobile/'
              } else {
                mobile = '';
              } 
              if(isTable === true) {
                tablet = 'Tablet/'
              } else {
                tablet = '';
              } 
              if(isDesktop === true) {
                desktop = 'Desktop/'
              } else {
                desktop = '';
              } 
              
              if(isLive === true) {
                live = 'Live/'
            } else {
                live = ''
            }

            if(isRemixable === true) {
                remixable = 'Remixable/'
            } else {
                remixable = ''
            }

            if(isAI === true) {
                aiType = 'AI/'
            } else {
                aiType = ''
            }

            if(isAR === true) {
                arType = 'AR/'
            } else {
                arType = ''
            }

            if(isVR === true) {
                vrType = 'VR/'
            } else {
                vrType = ''
            }

            if(is360 === true) {
                three60Type = '360/'
            } else {
                three60Type = ''
            }

            database.ref(`rooms/${shortID}/`).update(room).then(() => {
                        dispatch(createRoom({
                            ...room
                        }));
                        database.ref(`categorizations/${regular}${posttype}${isunlisted}${isprivate}${isweb}${isnative}${iswebnative}${allres}${mobile}${tablet}${desktop}${live}${remixable}${aiType}${arType}${vrType}${three60Type}${shortID}/`).update(room).then(() => {
                    
                        history.push(`${shortID}`)
                        
                    });
                    
                });
            } else {
              // No user is signed in.
              alert('you must sign up')
            }
          });

    
    }

}




export const removeRoom = ({ id } = {}) => ({
    type:'REMOVE_ROOM',
    id
});

export const editRoom = ({ id } = {}) => ({
    type:'EDIT_ROOM',
    id
});

export const setTextFilter = (text = '') => ({
    type:'SET_TEXT_FILTER',
    text
});

export const saveDHTML = ({ html, css, js } = {}) => ({
    type:'SAVE_DHTML',
    html,
    css,
    js
});