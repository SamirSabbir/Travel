import { Request, Response } from 'express';
import {
  createInvoiceInDB,
  getAllInvoicesFromDB,
  getInvoiceByIdFromDB,
  getInvoiceByWorkIdFromDB,
  updateInvoiceByIdInDB,
  deleteInvoiceByIdInDB,
  generateInvoicePDFInDB,
} from './invoice.service';

// ✅ Create
export const createInvoiceController = async (req: Request, res: Response) => {
  try {
    const invoice = await createInvoiceInDB(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create invoice', error: err });
  }
};

// ✅ Get all
export const getAllInvoicesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const invoices = await getAllInvoicesFromDB();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch invoices', error: err });
  }
};

// ✅ Get by ID
export const getInvoiceByIdController = async (req: Request, res: Response) => {
  try {
    const invoice = await getInvoiceByIdFromDB(req.params.id);
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch invoice', error: err });
  }
};

// ✅ Get by WorkId
export const getInvoiceByWorkIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const invoice = await getInvoiceByWorkIdFromDB(req.params.workId);
    res.json(invoice);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch invoice by workId', error: err });
  }
};

// ✅ Update
export const updateInvoiceByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const updatedInvoice = await updateInvoiceByIdInDB(req.params.id, req.body);
    res.json(updatedInvoice);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update invoice', error: err });
  }
};

// ✅ Delete
export const deleteInvoiceByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    await deleteInvoiceByIdInDB(req.params.id);
    res.json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete invoice', error: err });
  }
};

// ✅ Download PDF
export const downloadInvoicePDFController = async (
  req: Request,
  res: Response,
) => {
  try {
    await generateInvoicePDFInDB(req.params.id, res);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to download invoice PDF', error: err });
  }
};
