import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import {HomeContainer} from './components/Home';
import {ProjectContainer} from './components/Project';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    projects: [
        {
            "id": 1,
            "name": "Mon super roman",
            "type": "NOVEL",
            "status": "WRITING",
            "words": 12345
        }
    ]
  }
});

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomeContainer} />
        <Route path="projects/:id" component={ProjectContainer} />
      </Route>
    </Router>
  </Provider>),
  document.getElementById('app')
);
