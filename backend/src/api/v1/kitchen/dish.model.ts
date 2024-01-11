import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface IDish extends Document {
    title: string;
    description: string;
    image: string;
    time: number;
    category: string;
    status: boolean;
    ingredients: string[];
}

// ------------------------------------------
// Schema definition
const dishSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, default: '' },
    time: { type: Number, default: 0 },
    category: { type: String, default: 'general' },
    description: { type: String, required: true },
    status: { type: String, default: ''},
    ingredients: { type: [String], default: [] }

  },
  { ...DefaultSchemaOptions }
);


// ------------------------------------------
// Schema model exports
export const DishModel: Model<IDish> = model<IDish>(
  'Dish', dishSchema, 'Dish'
);



