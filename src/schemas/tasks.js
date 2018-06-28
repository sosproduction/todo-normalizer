import { Schema } from 'normalizr';
import ProjectSchema from './projects';
import Task from '../models/task';

const schema = new Schema(
  'tasks',
  { idAttribute: (entity) => new Task(entity).entityId }
);

schema.define({
  project: ProjectSchema
});
export default schema;
