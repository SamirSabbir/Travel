import express from 'express';
import { createSalesEntry, getAllSales } from './sales.controller';
import { auth } from '../../middlewares/auth';

const salesRoutes = express.Router();

salesRoutes.post('/', auth('Employee', 'SuperAdmin'), createSalesEntry); 
salesRoutes.get('/', auth('Employee', 'SuperAdmin'), getAllSales); 

export default salesRoutes;
