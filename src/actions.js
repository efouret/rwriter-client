export const SET_STATE = 'SET_STATE';
export function setState(state) {
  return {
    type: SET_STATE,
    state
  };
}

export const ADD_PROJECT = 'ADD_PROJECT';
export function addProject(project) {
  return {
      meta: {remote: true},
      type: ADD_PROJECT,
      currentProject: project
  };
}

export const GET_PROJECT = 'GET_PROJECT';
export function getProject(projectId) {
  return {
      meta: {remote: true},
      type: GET_PROJECT,
      currentProject: {_id: projectId}
  };
}