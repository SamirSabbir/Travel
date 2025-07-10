import express from 'express';
import { auth } from '../../middlewares/auth';
import { createLead, getAllLeads } from './leads.controller';

const leadRoutes = express.Router();

leadRoutes.post('/create-leads', auth('Admin'), createLead);
leadRoutes.get('/', auth('Employee'), getAllLeads);

export default leadRoutes;
