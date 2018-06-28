import { combineReducers } from 'redux';

import tasks from './tasks';
import projects from './projects';

export const reducers = {
  tasks,
  projects,
};

export default combineReducers(reducers);
