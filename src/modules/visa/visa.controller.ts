import { Request, Response } from 'express';
import {
  getAllVisasFromDB,
  getVisaByAssignedToFromDB,
  updateVisaByIdInDB,
} from './visa.service';

export const getAllVisasController = async (_req: Request, res: Response) => {
  try {
    const visas = await getAllVisasFromDB();
    res.json(visas);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch visas', error: err });
  }
};

export const getVisaByAssignedToController = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user.userEmail;
    const visa = await getVisaByAssignedToFromDB(userEmail);
    res.json(visa);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch visa', error: err });
  }
};

export const updateVisaByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.userEmail;
    const updateData = req.body;

    const updatedVisa = await updateVisaByIdInDB(id, userEmail, updateData);
    res.json(updatedVisa);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update visa', error: err });
  }
};
