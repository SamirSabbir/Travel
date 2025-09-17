import { Request, Response } from "express";
import {
  createLunchInDB,
  getAllLunchesFromDB,
  updateLunchByIdInDB,
  deleteLunchByIdInDB,
  getMonthlyLunchTotal,
} from "./lunch.service";

export const createLunchController = async (req: Request, res: Response) => {
  try {
    const result = await createLunchInDB(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllLunchesController = async (_req: Request, res: Response) => {
  const result = await getAllLunchesFromDB();
  res.json(result);
};

export const updateLunchByIdController = async (req: Request, res: Response) => {
  const result = await updateLunchByIdInDB(req.params.id, req.body);
  res.json(result);
};

export const deleteLunchByIdController = async (req: Request, res: Response) => {
  await deleteLunchByIdInDB(req.params.id);
  res.json({ message: "Lunch entry deleted" });
};

export const getMonthlyLunchTotalController = async (req: Request, res: Response) => {
  const { year, month } = req.query;
  const total = await getMonthlyLunchTotal(Number(year), Number(month));
  res.json({ total });
};
