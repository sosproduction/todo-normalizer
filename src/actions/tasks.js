import fetch from 'isomorphic-fetch';
import { createAction } from 'redux-actions';
import { normalize, arrayOf } from 'normalizr';
import TaskSchema from '../schemas/tasks';

const schema = {
  tasks: arrayOf({
    task: TaskSchema
  })
};

const fetchTasksAction = createAction('FETCH_TASKS', (result, entities) => { return {result, entities}; });
const createTaskAction = createAction('CREATE_TASK', (result, entities) => { return {result, entities}; });
const finishTaskAction = createAction('FINISH_TASK', (entityId) => { return {entityId}; });

export function fetchTasks(getState) {
  return (dispatch, getState) => {
    fetch('/tasks.json').then((res) => {
      return res.json();
    }).then((json) => {
      const { result, entities } = normalize(json, schema);

      console.log(
        'normalized results',
        normalize(json, schema)
      );

      return dispatch(fetchTasksAction(result, entities));
    });
  };
}

export function createTask(body, ownerEntityId) {
  return (dispatch, getState) => {
    const project = getState().entities.projects.get(ownerEntityId);
    fetch('/tasks.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({body, projectId: project.id})
    }).then((res) => {
      return res.json();
    }).then((json) => {
      const { result, entities } = normalize(json, {task: TaskSchema});
      return dispatch(createTaskAction(result, entities));
    })
  };
}

export function finishTask(entityId) {
  return (dispatch, getState) => {
    const task = getState().entities.tasks.get(entityId);
    fetch(`/tasks/${task.get('id')}.json`, {
      method: 'PUT',
      headers: {
        'Content-TYpe': 'application/json'
      },
      body: JSON.stringify({status: 2})
    }).then((res) => {
      return dispatch(finishTaskAction(entityId));
    })
  };
}
