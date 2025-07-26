import { Request, Response } from 'express';
import { assignEmailToLeadInDB, createLeadInDB, getAllLeadsFromDB, getAssignedLeadsFromDB } from './leads.service';

export const createLead = async (req: Request, res: Response) => {
  try {
    const result = await createLeadInDB({
      ...req.body,
      adminEmail: req.user.userEmail,
    });
    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const result = await getAllLeadsFromDB();
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Add this to your existing controllers
export const assignEmailToLead = async (req: Request, res: Response) => {
  try {
    const { leadId } = req.params;
    const { email } = req.body;
    
    if (!email) {
      throw new Error('Email is required');
    }
    
    const result = await assignEmailToLeadInDB(leadId, email);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getMyAssignedLeads = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user.userEmail; // Assuming user email is in the JWT
    const result = await getAssignedLeadsFromDB(userEmail);
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};