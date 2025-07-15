import { Request, Response } from 'express';
import { createSalesEntryInDB, getAllSalesFromDB } from './sales.service';


export const createSalesEntry = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await createSalesEntryInDB({...data,employeeEmail:req.user?.userEmail});
    res.status(201).json({
      success: true,
      message: 'Sales data submitted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to submit sales data',
    });
  }
};

export const getAllSales = async (req: Request, res: Response) => {
  try {
    const result = await getAllSalesFromDB();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch sales data',
    });
  }
};
