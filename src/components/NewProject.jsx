import React from 'react';
import NavBar from './NavBar';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {Link} from 'react-router';
import * as actionCreators from '../action_creators';

export const NewProject = React.createClass({
  mixins: [PureRenderMixin],
  createProject: function(name, type) {
    console.log(`New project of type ${type}: '${name}'`);
    this.props.createProject({name, type});
  },
  render: function() {
      let name, type;

      const onClick = (e) => {
          this.createProject(name.value, type.value);
          e.preventDefault();
      }

    return (
    <div>
        <NavBar />
        <div className="container">
            <h1>Create new project</h1>

            <form className="form-horizontal" onSubmit={onClick}>
                <div className="form-group">
                    <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" placeholder="Name"  ref={el => name = el}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="type" className="col-sm-2 control-label">Type</label>
                    <div className="col-sm-10">
                        <select id="type" ref={el => type = el}>
                            <option>NOVEL</option>
                            <option>SHORT STORY</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">Create</button>
                    </div>
                </div>
            </form>

        </div>
    </div>);
  }
});

function mapStateToProps(state) {
  return {
    projects: state.get('projects')
  };
}

export const NewProjectContainer = connect(mapStateToProps, actionCreators)(NewProject);
