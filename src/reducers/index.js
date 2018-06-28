import { combineReducers } from 'redux';

import entities from './entities';
import tasks from './tasks';
import projects from './projects';

export const reducers = {
  entities,
  tasks,
  projects,
};

export default combineReducers(reducers);
