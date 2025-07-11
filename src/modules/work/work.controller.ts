import { Request, Response } from 'express';
import { createWorkInDB, getAllWorkFromDB, getPipelineDataFromDB } from './work.service';


export const createWorkEntry = async (req: Request, res: Response) => {
  try {
    const { salesId, status } = req.body;

    const filePaths = req.files
      ? (req.files as Express.Multer.File[]).map(file => file.path)
      : [];

    const result = await createWorkInDB({
      salesId,
      files: filePaths,
      status,
    });

    res.status(201).json({
      success: true,
      message: 'Work entry created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create work entry',
    });
  }
};

export const getPipelineData = async (req: Request, res: Response) => {
  try {
    const result = await getPipelineDataFromDB();
    res.status(200).json({
      success: true,
      message: 'Pipeline data retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch pipeline data',
    });
  }
};

export const getAllWorkEntries = async (req: Request, res: Response) => {
  try {
    const result = await getAllWorkFromDB();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch work entries',
    });
  }
};
