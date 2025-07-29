import { Request, Response } from 'express';
import {
  getAllEmployeeSales,
  getAllSalesFromDB,
  updateConfirmSales,
  updateSalesDataIntoDB,
} from './sales.service';

// export const createSalesEntry = async (req: Request, res: Response) => {
//   try {
//     const data = req.body;
//     const result = await createSalesEntryInDB({...data,employeeEmail:req.user?.userEmail});
//     res.status(201).json({
//       success: true,
//       message: 'Sales data submitted successfully',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(400).json({
//       success: false,
//       message: err.message || 'Failed to submit sales data',
//     });
//   }
// };

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

export const getEmployeeSales = async (req: Request, res: Response) => {
  try {
    const result = await getAllEmployeeSales(req?.user?.userEmail);
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

export const confirmSales = async (req: Request, res: Response) => {
  try {
    const result = await updateConfirmSales(
      req?.params?.salesId as string,
      req?.user?.userEmail as string,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to confirm sales ',
    });
  }
};

export const updateSalesData = async (req: Request, res: Response) => {
  try {
    const result = await updateSalesDataIntoDB(
      req?.params?.salesId as string,
      req.body,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to confirm sales ',
    });
  }
};
