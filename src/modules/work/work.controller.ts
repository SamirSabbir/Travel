import { Request, Response } from 'express';
import {
  createWorkInDB,
  getAdminPipelineDataFromDB,
  getAllEmployeesWorks,
  getAllEmployeeWorks,
  getAllWorkFromDB,
  getMyPipelineDataFromDB,
  getPipelineDataFromDB,
  updateWorkStatusAccountAdmin,
  updateWorkStatusSuperAdmin,
  updateWorkStatusWithEmployee,
} from './work.service';

export const createWorkEntry = async (req: Request, res: Response) => {
  try {
    const { salesId, status } = req.body;

    const filePaths = req.files
      ? (req.files as Express.Multer.File[]).map((file) => file.path)
      : [];

    const result = await createWorkInDB({
      salesId,
      files: filePaths,
      status,
      employeeEmail: req.user?.userEmail,
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
    const result = await getPipelineDataFromDB(req?.user.userEmail);
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

export const getAdminPipelineData = async (req: Request, res: Response) => {
  try {
    const result = await getMyPipelineDataFromDB(req.user.userEmail);
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

export const getMyPipelineData = async (req: Request, res: Response) => {
  try {
    const result = await getMyPipelineDataFromDB(req.params.employeeEmail);
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

export const getMyWorkData = async (req: Request, res: Response) => {
  try {
    const result = await getAllEmployeeWorks(req.user.userEmail);
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

export const getAllEmployeeWorkEntries = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await getAllEmployeesWorks();
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

export const getAllEmployeeWorkEntriesForAdmin = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await getAllEmployeeWorks(req?.params.employeeEmail);
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

export const updateWorkWithEmployee = async (req: Request, res: Response) => {
  try {
    const result = await updateWorkStatusWithEmployee(
      req.params.workId as string,
      req?.user.userEmail,
      req.body,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to update work entry',
    });
  }
};

export const updateWorkWithSuperAdmin = async (req: Request, res: Response) => {
  try {
    const result = await updateWorkStatusSuperAdmin(
      req.params.workId as string,
      req.body,
      req.user?.userEmail,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to update work entry',
    });
  }
};

export const updateWorkWithAccountAdmin = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await updateWorkStatusAccountAdmin(
      req.params.workId as string,
      req.body,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to update work entry',
    });
  }
};
