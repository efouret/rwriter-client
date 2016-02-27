import React from 'react';
import NavBar from './NavBar';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {Link} from 'react-router';

export const Project = React.createClass({
  mixins: [PureRenderMixin],
  getProjects: function() {
    return this.props.projects || [];
  },
  getProject: function() {
    return this.getProjects().find(p => p.get('_id') === this.props.params.id) || new Map();
  },
  render: function() {
    return (
    <div>
        <NavBar />
        <div className="container">
            <h1 className="page-header">{this.getProject().get('name')}</h1>

            <ul className="nav nav-tabs">
                <li className="active"><Link to={`/projects/${this.props.params.id}`}>Summary</Link></li>
                <li><Link to={`/projects/${this.props.params.id}/chapters`}>Chapters</Link></li>
                <li><Link to={`/projects/${this.props.params.id}/characters`}>Characters</Link></li>
                <li><Link to={`/projects/${this.props.params.id}/locations`}>Locations</Link></li>
            </ul>

            <div>
                12 chapters
            </div>

            <div>
                12345 words
            </div>

            <div>
                Last chapter edited: <a href="#">Chapter 12</a>
            </div>
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
