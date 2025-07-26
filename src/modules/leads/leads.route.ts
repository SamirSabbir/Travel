import express from 'express';
import { auth } from '../../middlewares/auth';
import { assignEmailToLead, createLead, getAllLeads, getMyAssignedLeads } from './leads.controller';

const leadRoutes = express.Router();

leadRoutes.post('/create-lead', auth('SuperAdmin','HRAdmin'), createLead);
leadRoutes.get('/', auth('SuperAdmin','HRAdmin'), getAllLeads);
leadRoutes.patch('/assign/:leadId', auth('SuperAdmin', 'HRAdmin'), assignEmailToLead);
leadRoutes.get(
  '/my-leads',
  auth('Employee','SuperAdmin'), // Allowed for these roles
  getMyAssignedLeads
);

export default leadRoutes;
