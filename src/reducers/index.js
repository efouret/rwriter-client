import { combineReducers } from 'redux-immutable';
import currentProject from './currentProject';
import projects from './projects';
import routing from './routing';

const rootReducer = combineReducers({
  projects,
  currentProject,
  routing
});

export default rootReducer;