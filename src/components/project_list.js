import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { fetchProjects } from '../actions/projects';


class ProjectList extends Component {
  get value() {
    return this.refs.selector.value;
  }

  componentWillMount() {
    this.props.fetchProjects();
  }

  render() {
    return (
      <div className='.project-list' style={{display: 'inline-block'}}>
        <select ref='selector'>
          {this.props.projects.map((project) => {
            const props = {
              key: project.entityId,
              value: project.entityId,
            };
            return <option {...props}>{project.name}{project.isBusy ? ' - Hot Potato' : ''}</option>;
          })}
        </select>
      </div>
    )
  }
}

ProjectList.propTypes = {
  projects: ImmutablePropTypes.orderedSet.isRequired,
  fetchProjects: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { projects: state.projects.get('projects').map((entityId) => { return state.entities.projects.get(entityId); }) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchProjects,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {withRef: true}
)(ProjectList);
