import express from 'express';
import { auth } from '../../middlewares/auth';
import {
  getEmployeeCommissionChart,
  getEmployeeKPIChart,
} from './chart.controller';

const chartRouter = express.Router();

chartRouter.get(
  '/KPI-Chart/:employeeId',
  auth('SuperAdmin', 'AccountAdmin'),
  getEmployeeKPIChart,
);
chartRouter.get(
  '/commission-Chart/:employeeId',
  auth('SuperAdmin', 'AccountAdmin'),
  getEmployeeCommissionChart,
);
