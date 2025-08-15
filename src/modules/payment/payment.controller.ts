import { Request, Response } from 'express';
import {
  createPayment,
  getAllPaymentsFromDB,
  getPaymentByIdFromDB,
  getPaymentByWorkIdFromDB,
  updatePaymentByIdInDB,
} from './payment.service';

// Create payment
export const handleCreatePayment = async (req: Request, res: Response) => {
  try {
    const result = await createPayment(req.body);
    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all payments
export const handleGetAllPayments = async (req: Request, res: Response) => {
  try {
    const result = await getAllPaymentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Fetched all payments',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get payment by ID
export const handleGetPaymentById = async (req: Request, res: Response) => {
  try {
    const result = await getPaymentByIdFromDB(req.params.id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: 'Payment not found' });
    res.status(200).json({
      success: true,
      message: 'Fetched payment',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get payment by workId
export const handleGetPaymentByWorkId = async (req: Request, res: Response) => {
  try {
    const result = await getPaymentByWorkIdFromDB(req.params.workId);
    if (!result)
      return res
        .status(404)
        .json({
          success: false,
          message: 'Payment not found for given workId',
        });
    res.status(200).json({
      success: true,
      message: 'Fetched payment by workId',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update payment by ID
export const handleUpdatePaymentById = async (req: Request, res: Response) => {
  try {
    const result = await updatePaymentByIdInDB(req.params.id, req.body);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: 'Payment not found' });
    res.status(200).json({
      success: true,
      message: 'Payment updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
