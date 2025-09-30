import { Request, Response } from 'express';
import {
  getAllEmployeeLeads,
  getAllLeadsFromDB,
  updateConfirmLeads,
  updateConfirmLeadsWithWorkId,
  updateLeadsDataIntoDB,
} from './leads.service';

// export const createLeadsEntry = async (req: any, res: Response) => {
//   try {
//     const data = req.body;
//     const result = await createLeadsEntryInDB({...data,employeeEmail:req.user?.userEmail});
//     res.status(201).json({
//       success: true,
//       message: 'Leads data submitted successfully',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(400).json({
//       success: false,
//       message: err.message || 'Failed to submit Leads data',
//     });
//   }
// };

export const getAllLeads = async (req: any, res: Response) => {
  try {
    const result = await getAllLeadsFromDB();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch Leads data',
    });
  }
};

export const getEmployeeLeads = async (req: any, res: Response) => {
  try {
    const result = await getAllEmployeeLeads(req?.user?.userEmail);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch Leads data',
    });
  }
};

export const getEmployeeLeadsForAdmin = async (req: any, res: Response) => {
  try {
    const result = await getAllEmployeeLeads(
      req?.params?.employeeEmail as string,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch Leads data',
    });
  }
};

export const confirmLeads = async (req: any, res: Response) => {
  try {
    const result = await updateConfirmLeads(
      req?.params?.LeadsId as string,
      req?.user?.userEmail as string,
      req.body,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to update Leads ',
    });
  }
};

export const confirmLeadsWithWorkId = async (req: any, res: Response) => {
  try {
    const result = await updateConfirmLeadsWithWorkId(
      req?.params?.workId as string,
      req?.user?.userEmail as string,
      req.body,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to update Leads ',
    });
  }
};

export const updateLeadsData = async (req: any, res: Response) => {
  try {
    const result = await updateLeadsDataIntoDB(
      req?.params?.LeadsId as string,
      req.body,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to confirm Leads ',
    });
  }
};
