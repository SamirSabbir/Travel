import express from 'express';
import {
  confirmSales,
  getAllSales,
  getEmployeeSales,
  getEmployeeSalesForAdmin,
  updateSalesData,
} from './sales.controller';
import { auth } from '../../middlewares/auth';

const salesRoutes = express.Router();

// salesRoutes.post('/', auth('Employee', 'SuperAdmin'), createSalesEntry);
salesRoutes.get(
  '/',
  auth('Employee', 'SuperAdmin', 'AccountAdmin'),
  getAllSales,
);
salesRoutes.get('/my-sales', auth('Employee', 'SuperAdmin'), getEmployeeSales);
salesRoutes.get(
  '/employee-sales/:employeeEmail',
  auth('SuperAdmin'),
  getEmployeeSalesForAdmin,
);
salesRoutes.patch(
  '/confirm-sales/:salesId',
  auth('Employee', 'SuperAdmin'),
  confirmSales,
);
salesRoutes.patch(
  '/update-sales/:salesId',
  auth('Employee', 'SuperAdmin'),
  updateSalesData,
);

export default salesRoutes;
