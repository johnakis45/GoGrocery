import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface Iinventory extends Document {
  title: string;
  description: string;
}

// ------------------------------------------
// Schema definition
const inventorySchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: '' },
    quantity: { type: Number, default: 0 },
    category: { type: String, default: 'general' },
    subcategory: { type: String, default: '' },
    description: { type: String, required: true },
    place : { type: String, default: '' },
    completed: { type: Boolean, default: false },
    expiration_date: { type: String, required: true},
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const InventoryModel: Model<Iinventory> = model<Iinventory>(
  'Inventory', inventorySchema, 'Inventory'
);
