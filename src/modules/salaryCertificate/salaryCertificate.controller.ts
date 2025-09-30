import { Request, Response } from 'express';
import {
  getAllSalaryCertificatesFromDB,
  getSalaryCertificateByAssignedToFromDB,
  approveSalaryCertificateByIdInDB,
  createSalaryCertificateInDB,
  cancelSalaryCertificateByIdInDB,
} from './salaryCertificate.service';

// Get all
export const getAllSalaryCertificatesController = async (
  _req: any,
  res: Response,
) => {
  try {
    const certificates = await getAllSalaryCertificatesFromDB();
    res.json(certificates);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch salary certificates', error: err });
  }
};

// Get by assigned user
export const getSalaryCertificateByAssignedToController = async (
  req: any,
  res: Response,
) => {
  try {
    const userEmail = req.user.userEmail;
    const certificate = await getSalaryCertificateByAssignedToFromDB(userEmail);
    res.json(certificate);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch certificate', error: err });
  }
};

// Update by ID
export const approveSalaryCertificateByIdController = async (
  req: any,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.userEmail;

    const updated = await approveSalaryCertificateByIdInDB(id, userEmail);
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to update certificate', error: err });
  }
};


export const cancelSalaryCertificateByIdController = async (
  req: any,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.userEmail;

    const updated = await cancelSalaryCertificateByIdInDB(id, userEmail);
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to update certificate', error: err });
  }
};

// Create
export const createSalaryCertificateController = async (
  req: any,
  res: Response,
) => {
  try {
    const data = req.body;
    const created = await createSalaryCertificateInDB(data);
    res.json(created);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create certificate', error: err });
  }
};
