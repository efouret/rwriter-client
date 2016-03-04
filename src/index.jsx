import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux'
import io from 'socket.io-client';
import {Map} from 'immutable';
import { combineReducers } from 'redux-immutable';

import reducers from './reducers';
import remoteActionMiddleware from './middlewares/remote_action_middleware';
import logger from './middlewares/logger';
import {setState} from './actions';
import App from './components/App';
import {HomeContainer} from './components/Home';
import {NewProjectContainer} from './components/NewProject';
import {ProjectContainer} from './components/Project';
import {ChaptersContainer} from './components/Chapters';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const store = createStore(combineReducers(reducers), Map(), applyMiddleware(remoteActionMiddleware(socket), logger));

socket.on('state', state =>
  store.dispatch(setState(state))
);

const history = syncHistoryWithStore(browserHistory, store, {selectLocationState: state => state.get('routing')})

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HomeContainer} />
        <Route path="newproject" component={NewProjectContainer}/>
        <Route path="projects/:id" component={ProjectContainer}>
            <Route path="chapters" component={ChaptersContainer} />
            <Route path="characters" />
            <Route path="locations" />
        </Route>
      </Route>
    </Router>
  </Provider>),
  document.getElementById('app')
);
