import { Schema, model } from 'mongoose';
import { TWork } from './work.interface';



const workSchema = new Schema<TWork>(
  {
    salesId: { type: Schema.Types.ObjectId, ref: 'Sales', required: true },
    files: [{ type: String, required: true }], 
    status: {
      type: String,
      enum: ['draft', 'complete', 'pending'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const WorkModel = model<TWork>('Work', workSchema);
