import React from 'react';
import NavBar from './NavBar';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export const Project = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
    <div>
        <NavBar />
        <div className="container">
        Hello!!
        My Project is {this.props.params.id}
        </div>
    </div>);
  }
});

function mapStateToProps(state) {
  return {
    projects: state.get('projects')
  };
}

export const ProjectContainer = connect(mapStateToProps)(Project);
