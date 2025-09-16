import { WorkRecordModel } from './workRecord.model';

// Get all records by assignedId (employee ID)
export const getWorkRecordsByAssignedId = async (assignedId: string) => {
  return await WorkRecordModel.find({ assignedId });
};

// Get all records by workId
export const getWorkRecordsByWorkId = async (workId: string) => {
  return await WorkRecordModel.find({ workId });
};
