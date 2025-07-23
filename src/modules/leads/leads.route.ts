import express from 'express';
import { auth } from '../../middlewares/auth';
import { createLead, getAllLeads } from './leads.controller';

const leadRoutes = express.Router();

leadRoutes.post('/create-lead', auth('SuperAdmin','HRAdmin'), createLead);
leadRoutes.get('/', auth('SuperAdmin','HRAdmin'), getAllLeads);

export default leadRoutes;
