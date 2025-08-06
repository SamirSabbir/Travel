import { Request, Response } from 'express';
import {
  getCommissionOfEmployeeFromDB,
  getKPIOfEmployeeFromDB,
} from './chart.service';

export const getEmployeeKPIChart = async (req: Request, res: Response) => {
  try {
    const result = await getKPIOfEmployeeFromDB(req.params.employeeId);
    res.status(201).json({
      success: true,
      message: 'KPI data retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create invoice',
    });
  }
};

export const getEmployeeCommissionChart = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await getCommissionOfEmployeeFromDB(req.params.employeeId);
    res.status(201).json({
      success: true,
      message: 'Commission data retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create invoice',
    });
  }
};
