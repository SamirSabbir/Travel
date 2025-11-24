import { Request, Response } from 'express';
import {
  getAllSpecialRequestsFromDB,
  getSpecialRequestByAssignedToFromDB,
  createSpecialRequestInDB,
  approveSpecialRequestByIdInDB,
  cancelSpecialRequestByIdInDB,
} from './specialRequest.service';

export const getAllSpecialRequestsController = async (
  _req: any,
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
  req: any,
  res: Response,
) => {
  try {
    const userEmail = req.user.userEmail;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validate pagination parameters
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page and limit must be positive numbers',
      });
    }

    const result = await getSpecialRequestByAssignedToFromDB(
      userEmail,
      page,
      limit,
    );

    res.status(200).json({
      success: true,
      message: 'User special requests fetched successfully',
      data: result,
    });
  } catch (err: any) {
    console.error('Error fetching user special requests:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user requests',
      error: err.message,
    });
  }
};

export const approveSpecialRequestByIdController = async (
  req: any,
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
  req: any,
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
  req: any,
  res: Response,
) => {
  try {
    const data = req.body;
    const created = await createSpecialRequestInDB(req.user.userEmail, data);
    res.json(created);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: err.message || 'Failed to create request', error: err });
  }
};
