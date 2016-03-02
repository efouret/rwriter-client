import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {Map} from 'immutable';

import reducer from './reducers';
import remoteActionMiddleware from './remote_action_middleware';
import {setState} from './actions';
import App from './components/App';
import {HomeContainer} from './components/Home';
import {NewProjectContainer} from './components/NewProject';
import {ProjectContainer} from './components/Project';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

/*const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);*/
const store = createStore(reducer, Map(), applyMiddleware(remoteActionMiddleware(socket)));

socket.on('state', state =>
  store.dispatch(setState(state))
);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomeContainer} />
        <Route path="newproject" component={NewProjectContainer}/>
        <Route path="projects/:id" component={ProjectContainer}>
            <Route path="chapters" />
            <Route path="characters" />
            <Route path="locations" />
        </Route>
      </Route>
    </Router>
  </Provider>),
  document.getElementById('app')
);
