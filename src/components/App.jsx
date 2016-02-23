import React from 'react';
import NavBar from './NavBar';

export default React.createClass({
  render: function() {
    return <div>
        <NavBar />
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
                    <tr className="clickable-row" data-href="project-overview.html">
                        <td>Novel</td>
                        <td>Mon super roman</td>
                        <td>Writing</td>
                        <td>12345</td>
                    </tr>
                    <tr className="clickable-row" data-href="project-overview.html">
                        <td>Short Story</td>
                        <td>Concours Utopiales 2016</td>
                        <td>Thinking</td>
                        <td>0/500</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <button type="button" className="btn btn-success btn">
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
        </button>
    </div>

    </div>;
  }
});
