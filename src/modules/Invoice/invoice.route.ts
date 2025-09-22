import { Router } from 'express';
import {
  createInvoiceController,
  getAllInvoicesController,
  getInvoiceByIdController,
  getInvoiceByWorkIdController,
  updateInvoiceByIdController,
  deleteInvoiceByIdController,
} from './invoice.controller';
import { auth } from '../../middlewares/auth';

export const invoiceRoutes = Router();

// ✅ SuperAdmin & Accounts can see all invoices
invoiceRoutes.get(
  '/',
  auth('SuperAdmin', 'AccountAdmin'),
  getAllInvoicesController,
);

// ✅ Employees can fetch their invoice by workId
invoiceRoutes.get(
  '/work/:workId',
  auth('Employee'),
  getInvoiceByWorkIdController,
);

// ✅ Fetch invoice by ID (SuperAdmin/Accounts)
invoiceRoutes.get(
  '/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  getInvoiceByIdController,
);

// ✅ Create invoice (SuperAdmin/Accounts)
invoiceRoutes.post(
  '/',
  auth('SuperAdmin', 'AccountAdmin'),
  createInvoiceController,
);

// ✅ Update invoice (SuperAdmin/Accounts)
invoiceRoutes.patch(
  '/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  updateInvoiceByIdController,
);

// ✅ Delete invoice (SuperAdmin/Accounts)
invoiceRoutes.delete(
  '/:id',
  auth('SuperAdmin', 'AccountAdmin'),
  deleteInvoiceByIdController,
);
