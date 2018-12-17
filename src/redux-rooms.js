import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//RETURNING ACTION OBJ
//ACTION GENERATOR






store.subscribe(() => {
    console.log(store.getState());
});

const roomOne = store.dispatch(createRoom({description:'sss'}))
const roomTwo = store.dispatch(createRoom({description:'sddsds'}))

store.dispatch(removeRoom({id: roomOne.room.id}));


store.dispatch(setTextFilter('funny'))