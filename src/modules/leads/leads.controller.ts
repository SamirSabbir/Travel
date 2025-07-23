import { Request, Response } from 'express';
import { createLeadInDB, getAllLeadsFromDB } from './leads.service';

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
