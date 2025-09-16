import { auth } from "../../middlewares/auth";
import { handleCreateInvoice, handleGetAllInvoices, handleGetInvoiceById } from './invoice.controller';
import express from 'express';

const router = express.Router();

router.post('/', auth('SuperAdmin', 'AccountAdmin'), handleCreateInvoice);
router.get('/', auth('SuperAdmin', 'AccountAdmin'), handleGetAllInvoices);
router.get('/:id', auth('SuperAdmin', 'AccountAdmin'), handleGetInvoiceById);

export const invoiceRoutes = router;
