import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TaskType } from '../models/task';
import { finishTask } from '../actions/tasks';

class Task extends Component {
  onClickDone() {
    this.props.onClickDone(this.props.task.entityId);
  }

  renderTask() {
    return <li>{this.props.project.name}:{this.props.task.body} <button onClick={this.onClickDone.bind(this)}>Done</button></li>;
  }

  renderFinishedTask() {
    return <li><s>{this.props.project.name}:{this.props.task.body}</s></li>;
  }

  render() {
    console.log(this.props.task.status);
    console.log(this.props.task.isDone);
    return this.props.task.isDone ? this.renderFinishedTask() : this.renderTask();
  }
}

Task.propTypes = {
  task: TaskType.isRequired,
};

function mapStateToProps(state, ownProps) {
  const task = state.entities.tasks.get(ownProps.entityId);
  const project = state.entities.projects.get(task.project);
  return { task, project };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onClickDone: finishTask,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
