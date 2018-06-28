import { Schema } from 'normalizr';
import Project from '../models/project';

export default new Schema(
  'projects',
  { idAttribute: (entity) => new Project(entity).entityId }
);
