import express from 'express';
import {
  confirmLeads,
  getAllLeads,
  getEmployeeLeads,
  getEmployeeLeadsForAdmin,
  updateLeadsData,
} from './leads.controller';
import { auth } from '../../middlewares/auth';

const LeadsRoutes = express.Router();

// LeadsRoutes.post('/', auth('Employee', 'SuperAdmin'), createLeadsEntry);
LeadsRoutes.get(
  '/',
  auth('Employee', 'SuperAdmin', 'AccountAdmin'),
  getAllLeads,
);
LeadsRoutes.get('/my-Leads', auth('Employee', 'SuperAdmin'), getEmployeeLeads);
LeadsRoutes.get(
  '/employee-Leads/:employeeEmail',
  auth('SuperAdmin'),
  getEmployeeLeadsForAdmin,
);
LeadsRoutes.patch(
  '/confirm-Leads/:LeadsId',
  auth('Employee', 'SuperAdmin'),
  confirmLeads,
);
LeadsRoutes.patch(
  '/update-Leads/:LeadsId',
  auth('Employee', 'SuperAdmin'),
  updateLeadsData,
);

export default LeadsRoutes;
