import {List, Map} from 'immutable';

import {SET_STATE} from './actions';

function setState(state, newState) {
  return state.merge(newState);
}

function projects(state = List(), action) {
  console.debug(`state=${state}, action=${action}`);
  switch (action.type) {
  case SET_STATE:
    return setState(state, action.state.projects);
  }
  return state;
}

function currentProject(state = Map(), action) {
    return state;
}

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

function routing(state = {locationBeforeTransitions: null}, { type, payload }) {
    console.log('routing', type, payload);
  if (type === LOCATION_CHANGE) {
    return  {...state, locationBeforeTransitions: payload};
  }

  return state;
}

const reducers = {
  projects,
  currentProject,
  routing
};

export default reducers;