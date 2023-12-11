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
    title: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    category: { type: String, default: 'general' },
    image: { type: String, default: '' }
  },
  { ...DefaultSchemaOptions }
);







// ------------------------------------------
// Schema model exports
export const TaskModel: Model<ITask> = model<ITask>(
  'Task', taskSchema, 'Task'
);
