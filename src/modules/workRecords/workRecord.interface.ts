import mongoose from 'mongoose';

export interface TWorkRecord {
  workId: mongoose.Types.ObjectId;
  assignedTo: string;
  assignedBy: string;
}
