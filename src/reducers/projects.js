import { handleActions } from 'redux-actions';
import Immutable from 'immutable'

function merge(state, action) {
  const payload = action.payload;
  return state.update('projects', (current) => {
    const entityIds = payload.result.projects.map((value) => { return value.project; })
    return current.union(entityIds);
  });
}

const handlers = {
  FETCH_PROJECTS: merge,
};

const initialState = Immutable.Map({
  projects: Immutable.OrderedSet(),
});

export default handleActions(handlers, initialState);
