import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createTask } from '../actions/tasks';
import ProjectList from './project_list';
import TextForm from './text_form';

class TaskForm extends Component {
  onClick() {
    const body = this.refs.input.value;
    const projectEntityId = this.refs.owner.getWrappedInstance().value;
    this.props.onClick(body, projectEntityId);
  }

  onSelect(selectedProjectEntityId) {
    this.setState({selectedProjectEntityId});
  }

  render() {
    return (
      <div className='task-form'>
        <ProjectList ref='owner'/>
        <input ref='input' type='text'/>
        <button onClick={this.onClick.bind(this)}>Save</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onClick: createTask,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
