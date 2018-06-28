import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchTasks } from '../actions/tasks';
import Task from './task';
import TaskForm from './task_form';


class TaskList extends Component {
  componentWillMount() {
    this.props.fetchTasks();
  }

  render() {
    return (
      <div className='.task-list'>
        <TaskForm/>
        <ul>
          {this.props.tasks.map((entityId) => { return <Task key={entityId} entityId={entityId}/>; })}
        </ul>
      </div>
    );
  }
}

TaskList.propTypes = {
  tasks: ImmutablePropTypes.orderedSet.isRequired
};

function mapStateToProps(state) {
  const tasks = state.tasks.get('tasks');
  return { tasks };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTasks,
  }, dispatch);
};

//export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
