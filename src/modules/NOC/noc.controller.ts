import { Request, Response } from 'express';
import {
  getAllNOCsFromDB,
  getNOCByAssignedToFromDB,
  createNOCInDB,
  ApproveNOCByIdInDB,
} from './noc.service';

export const getAllNOCsController = async (_req: Request, res: Response) => {
  try {
    const nocs = await getAllNOCsFromDB();
    res.json(nocs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch NOCs', error: err });
  }
};

export const getNOCByAssignedToController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userEmail = req.user.userEmail;
    const noc = await getNOCByAssignedToFromDB(userEmail);
    res.json(noc);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch NOC', error: err });
  }
};

export const approveNOCByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.userEmail;

    const updated = await ApproveNOCByIdInDB(id, userEmail);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update NOC', error: err });
  }
};

export const createNOCController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const created = await createNOCInDB(data);
    res.json(created);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create NOC', error: err });
  }
};
