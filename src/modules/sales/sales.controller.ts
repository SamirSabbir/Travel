import { Request, Response } from 'express';
import { createSalesEntryInDB } from './sales.service';


export const createSalesEntry = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await createSalesEntryInDB(data);
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
