import { Request, Response } from 'express';
import {
  createOfficeSupplyInDB,
  getAllOfficeSuppliesFromDB,
  updateOfficeSupplyByIdInDB,
  deleteOfficeSupplyByIdInDB,
  getMonthlyOfficeSuppliesTotal,
} from './officeSupplies.service';

export const createOfficeSupplyController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await createOfficeSupplyInDB(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllOfficeSuppliesController = async (
  _req: Request,
  res: Response,
) => {
  const result = await getAllOfficeSuppliesFromDB();
  res.json(result);
};

export const updateOfficeSupplyByIdController = async (
  req: Request,
  res: Response,
) => {
  const result = await updateOfficeSupplyByIdInDB(req.params.id, req.body);
  res.json(result);
};

export const deleteOfficeSupplyByIdController = async (
  req: Request,
  res: Response,
) => {
  await deleteOfficeSupplyByIdInDB(req.params.id);
  res.json({ message: 'Office supply deleted' });
};

export const getMonthlyOfficeSuppliesTotalController = async (
  req: Request,
  res: Response,
) => {
  const { year, month } = req.query;
  const total = await getMonthlyOfficeSuppliesTotal(
    Number(year),
    Number(month),
  );
  res.json({ total });
};
