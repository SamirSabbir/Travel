import { Request, Response } from 'express';
import {
  approveWorkInDB,
  applyForApproveWorkInDB, // Add this import
  createWorkInDB,
  getAdminPipelineDataFromDB,
  getAllEmployeesWorks,
  getAllEmployeeWorks,
  getAllUnapprovedWorksFromDB,
  getAllWorkFromDB,
  getMyPipelineDataFromDB,
  getPipelineDataFromDB,
  updateWorkStatusAccountAdmin,
  updateWorkStatusSuperAdmin,
  updateWorkStatusWithEmployee,
  directApproveWorkInDB,
  assignWorkWithEmployee,
  cancelWorkInDB,
  assignServiceInDB,
} from './work.service';

export const createWorkEntry = async (req: Request, res: Response) => {
  try {
    const { leadsId, status } = req.body;

    const filePaths = req.files
      ? (req.files as Express.Multer.File[]).map((file) => file.path)
      : [];

    const result = await createWorkInDB({
      leadId: leadsId,
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
    const result = await getAdminPipelineDataFromDB(); // Fixed: Use getAdminPipelineDataFromDB instead of getMyPipelineDataFromDB
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
      message: 'Work data retrieved successfully', // Fixed message
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch work data',
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

export const getAllUnapprovedWorks = async (req: Request, res: Response) => {
  try {
    const result = await getAllUnapprovedWorksFromDB();
    res.status(200).json({
      success: true,
      message: 'Unapproved works retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch unapproved works',
    });
  }
};

export const approveWork = async (req: Request, res: Response) => {
  try {
    const result = await approveWorkInDB(req.params.workId);

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Work not found or already approved',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Work approved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to approve work',
    });
  }
};

export const cancelWorkController = async (req: Request, res: Response) => {
  try {
    const result = await cancelWorkInDB(req.params.workId);

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Work not found or already approved',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Work cancled successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to cancel work',
    });
  }
};

export const directApproveWork = async (req: Request, res: Response) => {
  try {
    const result = await directApproveWorkInDB(req.params.workId, req.body);

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Work not found or already approved',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Work approved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to approve work',
    });
  }
};

// Add the missing controller function
export const applyForWorkApproval = async (req: Request, res: Response) => {
  try {
    const result = await applyForApproveWorkInDB(req.params.workId, req.body);

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Work not found or already applied for approval',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Work approval applied successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to apply for work approval',
    });
  }
};

export const assignWorkWithEmployeeController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await assignWorkWithEmployee(
      req.params.workId as string,
      req?.user.userEmail,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: 'Work assigned successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to assign work',
    });
  }
};

export const assignServiceController = async (req: Request, res: Response) => {
  try {
    const { workId } = req.params;
    const result = await assignServiceInDB(workId, req.body);

    res.status(200).json({
      success: true,
      message: 'Services assigned successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to assign services',
    });
  }
};
