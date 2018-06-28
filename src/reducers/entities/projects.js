import { handleActions } from 'redux-actions';
import Immutable from 'immutable'
import _ from 'lodash';
import Project from '../../models/project';

function merge(state, action) {
  const payload = action.payload;
  return _.reduce(_.mapValues(payload.entities.projects), (res, value) => {
    const entityId = (new Project(value)).entityId;
    return res.update(entityId, new Project(), (current) => {
      return current.merge(value);
    });
  }, state);
}

const handlers = {
  FETCH_TASKS: merge
};

const initialState = Immutable.Map();

export default handleActions(handlers, initialState);
