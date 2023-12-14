import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IItem extends Document {
  name: string;
  description: string;
}

// ------------------------------------------
// Schema definition
const itemSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: '' },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    category: { type: String, default: 'general' },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const ItemModel: Model<IItem> = model<IItem>(
  'Item', itemSchema, 'Item'
);
