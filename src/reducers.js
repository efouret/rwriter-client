import { combineReducers } from 'redux-immutable';
import {List, Map} from 'immutable';
import {SET_STATE} from './actions';

function setState(state, newState) {
  return state.merge(newState);
}

function projects(state = List(), action) {
  console.debug(`state=${state}, action=${action}`);
  switch (action.type) {
  case SET_STATE:
    return setState(state, action.state);
  }
  return state;
}

function currentProject(state = Map(), action) {
    return state;
}

const rootReducer = combineReducers({
    projects, 
    currentProject
});