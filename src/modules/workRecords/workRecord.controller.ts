import { Request, Response } from 'express';
import {
  getWorkRecordsByAssignedId,
  getWorkRecordsByWorkId,
} from './workRecord.service';

// Get all by assignedId
export const handleGetWorkRecordsByAssignedId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { assignedId } = req.params;
    const result = await getWorkRecordsByAssignedId(assignedId);
    res.status(200).json({
      success: true,
      message: 'Fetched all work records for the assigned employee',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch work records',
    });
  }
};

// Get all by workId
export const handleGetWorkRecordsByWorkId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { workId } = req.params;
    const result = await getWorkRecordsByWorkId(workId);
    res.status(200).json({
      success: true,
      message: 'Fetched all work records for the given work',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch work records',
    });
  }
};
