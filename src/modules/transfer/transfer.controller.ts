import { Request, Response } from 'express';
import {
  getAllTransfersFromDB,
  getTransferByAssignedToFromDB,
  updateTransferByIdInDB,
} from './transfer.service';

export const getAllTransfersController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const transfers = await getAllTransfersFromDB();
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transfers', error: err });
  }
};

export const getTransferByAssignedToController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userEmail = req.user.userEmail;
    const transfer = await getTransferByAssignedToFromDB(userEmail);
    res.json(transfer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transfer', error: err });
  }
};

export const updateTransferByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.userEmail;
    const updateData = req.body;

    const updatedTransfer = await updateTransferByIdInDB(
      id,
      userEmail,
      updateData,
    );
    res.json(updatedTransfer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update transfer', error: err });
  }
};
