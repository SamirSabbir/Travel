import express from 'express';
import { createSalesEntry } from './sales.controller';
import { auth } from '../../middlewares/auth';

const salesRoutes = express.Router();

salesRoutes.post('/', auth('Employee'), createSalesEntry); 

export default salesRoutes;
