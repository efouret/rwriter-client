import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux'
import {Map} from 'immutable';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/index';
import logger from './middlewares/logger';
import {fetchProjects} from './actions';
import App from './components/App';
import {HomeContainer} from './components/Home';
import {NewProjectContainer} from './components/NewProject';
import {ProjectContainer} from './components/Project';
import {ChaptersContainer} from './components/Chapters';

const store = createStore(rootReducer, Map(), applyMiddleware(thunkMiddleware, logger));
const history = syncHistoryWithStore(browserHistory, store, {selectLocationState: state => state.get('routing')})

store.dispatch(fetchProjects());

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
