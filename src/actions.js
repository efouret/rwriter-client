export const SET_STATE = 'SET_STATE';
export function setState(state) {
  return {
    type: SET_STATE,
    state
  };
}

export const CREATE_PROJECT = 'CREATE_PROJECT';
export function createProject(project) {
  return {
      meta: {remote: true},
      type: CREATE_PROJECT,
      project
  };
}
