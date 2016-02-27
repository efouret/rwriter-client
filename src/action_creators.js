export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function createProject(project) {
  return {
      meta: {remote: true},
      type: 'CREATE_PROJECT',
      project
  };
}