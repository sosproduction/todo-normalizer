import { PropTypes } from 'react';
import { Record } from 'immutable';

export const INIT  = 1;
export const DONE  = 2;

const defaultValues = {
  id: undefined,
  project: undefined,
  projectId: undefined,
  body: '',
  status: INIT,
};

export const TaskType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  entityId: PropTypes.string.isRequired,
})

export default class Task extends Record(defaultValues) {
  get isDone() {
    return this.status === DONE;
  }

  get entityId() {
    return `task:${this.id}`;
  }
}
