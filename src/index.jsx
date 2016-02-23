import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
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

const routes = <Route component={App}>
  <Route path="/" component={HomeContainer} />
  <Route path="/projects/:id" component={ProjectContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
