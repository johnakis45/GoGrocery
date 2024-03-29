import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface ITask extends Document {
  title: string;
  description: string;
}

// ------------------------------------------
// Schema definition
const taskSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, default: '' },
    quantity: { type: Number, default: 0 },
    category: { type: String, default: 'general' },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { ...DefaultSchemaOptions }
);


// ------------------------------------------
// Schema model exports
export const TaskModel: Model<ITask> = model<ITask>(
  'Task', taskSchema, 'Task'
);



