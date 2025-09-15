import { Request, Response } from 'express';
import {
  getAllSpecialRequestsFromDB,
  getSpecialRequestByAssignedToFromDB,
  updateSpecialRequestByIdInDB,
  createSpecialRequestInDB,
} from './specialRequest.service';

export const getAllSpecialRequestsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const requests = await getAllSpecialRequestsFromDB();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err });
  }
};

export const getSpecialRequestByAssignedToController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userEmail = req.user.userEmail;
    const request = await getSpecialRequestByAssignedToFromDB(userEmail);
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch request', error: err });
  }
};

export const updateSpecialRequestByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.userEmail;
    const updateData = req.body;

    const updated = await updateSpecialRequestByIdInDB(
      id,
      userEmail,
      updateData,
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update request', error: err });
  }
};

export const createSpecialRequestController = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = req.body;
    const created = await createSpecialRequestInDB(data);
    res.json(created);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: err.message || 'Failed to create request', error: err });
  }
};
