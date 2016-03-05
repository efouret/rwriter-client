import {List} from 'immutable';
import {RECEIVE_PROJECTS} from '../actions';

export default function projects(state = List(), {type, projects}) {
  switch (type) {
    case RECEIVE_PROJECTS:
      return state.merge(projects);
  }
  return state;
}