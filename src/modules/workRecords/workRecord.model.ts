import { Schema, model } from 'mongoose';
import { TWorkRecord } from './workRecord.interface';

const workRecordSchema = new Schema<TWorkRecord>(
  {
    workId: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
    assignedTo: { type: String, required: true },
    assignedBy: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const WorkRecordModel = model('WorkRecord', workRecordSchema);
