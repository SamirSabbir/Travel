import { Request, Response } from 'express';
import {
  createInvoice,
  getAllInvoicesFromDB,
  getInvoiceByIdFromDB,
} from './invoice.service';

export const handleCreateInvoice = async (req: Request, res: Response) => {
  try {
    const result = await createInvoice(req.body, req?.user?.userEmail);
    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create invoice',
    });
  }
};

export const handleGetAllInvoices = async (req: Request, res: Response) => {
  try {
    const result = await getAllInvoicesFromDB(req?.user?.userEmail);
    res.status(200).json({
      success: true,
      message: 'Fetched all invoices',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch invoices',
    });
  }
};

export const handleGetInvoiceById = async (req: Request, res: Response) => {
  try {
    const result = await getInvoiceByIdFromDB(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Fetched invoice',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch invoice',
    });
  }
};
