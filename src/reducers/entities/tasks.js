import { handleActions } from 'redux-actions';
import Immutable from 'immutable'
import _ from 'lodash';
import Task, { DONE } from '../../models/task';

function merge(state, action) {
  const payload = action.payload;
  return _.reduce(_.mapValues(payload.entities.tasks), (res, value) => {
    const entityId = (new Task(value)).entityId;
    return res.update(entityId, new Task(), (current) => {
      return current.merge(value);
    });
  }, state);
}

function finish(state, action) {
  const entityId = action.payload.entityId;
  return state.update(entityId, (task) => {
    return task.set('status', DONE);
  });
}

const handlers = {
  FETCH_TASKS: merge,
  CREATE_TASK: merge,
  FINISH_TASK: finish,
};

const initialState = Immutable.Map();

export default handleActions(handlers, initialState);
