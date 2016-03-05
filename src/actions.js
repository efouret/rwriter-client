import axios from 'axios';

export const SET_STATE = 'SET_STATE';
export function setState(state) {
  return {
    type: SET_STATE,
    state
  };
}

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
function requestProjects() {
    return {
        type: REQUEST_PROJECTS
    }
}

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
function receiveProjects(projects) {
    return {
        type: RECEIVE_PROJECTS,
        projects
    }
}

export function fetchProjects() {
    return dispatch => {
        dispatch(requestProjects());

        axios.get(`${location.protocol}//${location.hostname}:8090/projects`)
            .then(response => {
                console.log(response.data);
                dispatch(receiveProjects(response.data));
            })
            .catch(exception => {
                console.log(exception);
            });
    };
}

export const CREATE_PROJECT = 'CREATE_PROJECT';
function createProject(project) {
    return {
        type: CREATE_PROJECT,
        currentProject: project
    }
}

export const ADD_PROJECT = 'ADD_PROJECT';
export function addProject(project) {
    return dispatch => {
        dispatch(createProject(project));

        axios.post(`${location.protocol}//${location.hostname}:8090/projects`, project)
            .then(response => {
                console.log(response);
            })
            .catch(exception => {
                console.log(exception);
            });
    };
}

export const REQUEST_PROJECT = 'REQUEST_PROJECT';
function requestProject(projectId) {
    return {
        type: REQUEST_PROJECT
    }
}

export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
function receiveProject(project) {
    return {
        type: RECEIVE_PROJECT,
        currentProject: project
    }
}

export function getProject(projectId) {
    return dispatch => {
        dispatch(requestProject(projectId));

        axios.get(`${location.protocol}//${location.hostname}:8090/projects/${projectId}`)
            .then(response => {
                dispatch(receiveProject(response.data));
            })
            .catch(exception => {
                console.log(exception);
            });
    }
}