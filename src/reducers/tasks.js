import { handleActions } from 'redux-actions';
import Immutable from 'immutable'

function merge(state, action) {
  const payload = action.payload;
  return state.update('tasks', (current) => {
    if(payload.result.tasks) {
      const entityIds = payload.result.tasks.map((value) => { return value.task; })
      return current.union(entityIds);
    } else if(payload.result.task) {
      const entityId = payload.result.task;
      return current.union([entityId]);
    }
  });
}

const handlers = {
  FETCH_TASKS: merge,
  CREATE_TASK: merge,
};

const initialState = Immutable.Map({
  tasks: Immutable.OrderedSet(),
});

export default handleActions(handlers, initialState);
