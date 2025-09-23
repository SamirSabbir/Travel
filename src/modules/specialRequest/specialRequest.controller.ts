import { Request, Response } from 'express';
import {
  getAllSpecialRequestsFromDB,
  getSpecialRequestByAssignedToFromDB,
  createSpecialRequestInDB,
  approveSpecialRequestByIdInDB,
  cancelSpecialRequestByIdInDB,
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

export const approveSpecialRequestByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.userEmail;

    const updated = await approveSpecialRequestByIdInDB(id, userEmail);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update request', error: err });
  }
};

export const cancelSpecialRequestByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.userEmail;

    const updated = await cancelSpecialRequestByIdInDB(id, userEmail);
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
    const created = await createSpecialRequestInDB(
      req.user.userName,
      req.user.userEmail,
      data,
    );
    res.json(created);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: err.message || 'Failed to create request', error: err });
  }
};
