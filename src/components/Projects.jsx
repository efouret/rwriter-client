import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    getProjects: function() {
        return this.props.projects || [];
    },
    render: function() {
        return (
           <div className="container">
            <h1 className="page-header">Projects</h1>

            <ol className="breadcrumb">
                <li><a href="index.html">Home</a></li>
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
                        <tr className="clickable-row" key={i}>
                            <td>{project.get('type')}</td>
                            <td>{project.get('name')}</td>
                            <td>{project.get('status')}</td>
                            <td>{project.get('words')}</td>
                        </tr>
                        )) }
                    </tbody>
                </table>
            </div>

            <button type="button" className="btn btn-success btn">
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
            </button>
        </div>
        );
     }
});
