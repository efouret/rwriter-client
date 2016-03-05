const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export default function routing(state = {locationBeforeTransitions: null}, { type, payload }) {
  if (type === LOCATION_CHANGE) {
    return {...state, locationBeforeTransitions: payload};
  }

  return state;
}
