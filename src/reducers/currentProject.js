import {Map} from 'immutable';
import {CREATE_PROJECT, RECEIVE_PROJECT} from '../actions';

export default function currentProject(state = Map(), {type, currentProject}) {
    switch (type) {
        case CREATE_PROJECT:
            return state.set('remote', true);
        case RECEIVE_PROJECT:
            return state.merge(currentProject);
    }
    return state;
}