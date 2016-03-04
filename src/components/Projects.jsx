import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link, browserHistory} from 'react-router';

export default React.createClass({
    mixins: [PureRenderMixin],
    getProjects: function() {
        return this.props.projects || [];
    },
    goToProject: function(id) {
      this.props.getProject(id);
      browserHistory.push(`/projects/${id}`);
    },
    newProject: function() {
      //this.context.router.push(`/newproject`);
      browserHistory.push(`/newproject`);
    },
    render: function() {
        return (
           <div className="container">
            <h1 className="page-header">Projects</h1>

            <ol className="breadcrumb">
                <li><Link to="/">Home</Link></li>
            </ol>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Word Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getProjects().map((project, i) => (
                        <tr className="clickable-row" key={i} onClick={this.goToProject.bind(null, project.get('_id'))}>
                            <td>{project.get('type')}</td>
                            <td>{project.get('name')}</td>
                            <td>{project.get('status')}</td>
                            <td>{project.get('words')}</td>
                        </tr>
                        )) }
                    </tbody>
                </table>
            </div>

            <button type="button" className="btn btn-success btn" onClick={this.newProject}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
            </button>
        </div>
        );
     }
});
