import React from 'react';
import NavBar from './NavBar';
import Projects from './Projects';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actions from '../actions';

export const Home = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
    <div>
        <NavBar />
        <Projects {...this.props} />
    </div>);
  }
});

function mapStateToProps(state) {
  return {
    projects: state.get('projects')
  };
}

export const HomeContainer = connect(mapStateToProps, actions)(Home);