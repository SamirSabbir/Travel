import { Request, Response } from 'express';
import {
  assignEmailToLeadsManageInDB,
  createLeadsManageInDB,
  getAllLeadsManageFromDB,
  getAssignedLeadsMangageFromDB,
} from './leadsManage.service';

export const createLeadsManage = async (req: any, res: Response) => {
  try {
    const result = await createLeadsManageInDB({
      ...req.body,
      adminEmail: req.user.userEmail,
    });
    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllLeadsManage = async (req: any, res: Response) => {
  try {
    const result = await getAllLeadsManageFromDB();
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Add this to your existing controllers
export const assignEmailToLeadsManage = async (req: any, res: Response) => {
  try {
    const { leadId } = req.params;
    const { email } = req.body;

    if (!email) {
      throw new Error('Email is required');
    }

    const result = await assignEmailToLeadsManageInDB(leadId, email);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getMyAssignedLeadsManage = async (req: any, res: Response) => {
  try {
    const userEmail = req.user.userEmail; // Assuming user email is in the JWT
    const result = await getAssignedLeadsMangageFromDB(userEmail);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
