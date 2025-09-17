import { Request, Response } from 'express';
import {
  createNotaryInDB,
  getAllNotariesFromDB,
  updateNotaryByIdInDB,
  deleteNotaryByIdInDB,
  getMonthlyNotaryTotal,
} from './notary.service';

export const createNotaryController = async (req: Request, res: Response) => {
  try {
    const result = await createNotaryInDB(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllNotariesController = async (
  _req: Request,
  res: Response,
) => {
  const result = await getAllNotariesFromDB();
  res.json(result);
};

export const updateNotaryByIdController = async (
  req: Request,
  res: Response,
) => {
  const result = await updateNotaryByIdInDB(req.params.id, req.body);
  res.json(result);
};

export const deleteNotaryByIdController = async (
  req: Request,
  res: Response,
) => {
  await deleteNotaryByIdInDB(req.params.id);
  res.json({ message: 'Notary entry deleted' });
};

export const getMonthlyNotaryTotalController = async (
  req: Request,
  res: Response,
) => {
  const { year, month } = req.query;
  const total = await getMonthlyNotaryTotal(Number(year), Number(month));
  res.json({ total });
};
