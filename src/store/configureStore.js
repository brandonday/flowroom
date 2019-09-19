import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import roomsReducer from '../reducers/rooms';
import filtersReducer from '../reducers/filters';
import isLoggedInReducer from '../reducers/isLoggedIn';
import dhtmlReducer from '../reducers/dhtml';
import authReducer from '../reducers/auth';
import userExists from '../reducers/userExists';
import entireAppReducer from '../reducers/entireApp'
import roomsFilters from '../reducers/roomsFilters'
import communitiesFilter from '../reducers/communitiesFilter'
import UpdateEditor from '../reducers/updateEditor';
import openMenu from '../reducers/openMenu';
import flowAdd from '../reducers/flowAdd';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            rooms:roomsReducer,
            filters:filtersReducer,
            isLoggedIn:isLoggedInReducer,
            dhtml:dhtmlReducer,
            auth:authReducer,
            entireApp:entireAppReducer,
            userExists:userExists,
            roomsFilters:roomsFilters,
            communitiesFilter:communitiesFilter,
            updateEditor:UpdateEditor,
            openMenu:openMenu,
            flowAdd:flowAdd
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}



