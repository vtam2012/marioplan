import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { deleteProject } from '../../store/actions/projectActions';
import moment from 'moment';

class ProjectDetails extends Component {
  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteProject(this.props.project);
    this.props.history.push('/');
  }

  render() {
    const { project, auth } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />
    if (project && (project.authorId === auth.uid)) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{ project.title }</span>
              <p>{ project.content }</p>
              <br />
              <button onClick={this.handleDelete} className="btn red darken-3 z-depth-0">DELETE PROJECT</button>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by { project.authorFirstName} { project.authorLastName }</div>
              <div>{ moment(project.createdAt.toDate()).calendar() }</div>
            </div>
          </div>
        </div>
      );
    }
    else if (project) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{ project.title }</span>
              <p>{ project.content }</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>Posted by { project.authorFirstName} { project.authorLastName }</div>
              <div>{ moment(project.createdAt.toDate()).calendar() }</div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (project) => dispatch(deleteProject(project))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects'}
  ])
)(ProjectDetails);
