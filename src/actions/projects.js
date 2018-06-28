import fetch from 'isomorphic-fetch';
import { createAction } from 'redux-actions';
import { normalize, arrayOf } from 'normalizr';
import ProjectSchema from '../schemas/projects';

const schema = {
  projects: arrayOf({
    project: ProjectSchema
  })
};

const fetchProjectsAction = createAction('FETCH_PROJECTS', (result, entities) => { return {result, entities}; });

export function fetchProjects(getState) {
  return (dispatch, getState) => {
    fetch('/projects.json').then((res) => {
      return res.json();
    }).then((json) => {
      const { result, entities } = normalize(json, schema);
      return dispatch(fetchProjectsAction(result, entities));
    });
  };
}
