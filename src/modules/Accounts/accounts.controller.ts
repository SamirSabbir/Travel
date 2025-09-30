// controllers/account.controller.ts
import { Request, Response } from 'express';
import {
  createAccountData,
  getAccountByIdFromDB,
  getAllAccountsFromDB,
  getMyAccountsFromDB,
} from './accounts.service';

export const handleCreateAccount = async (req: Request, res: Response) => {
  try {
    const result = await createAccountData({ ...req.body });
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create account',
    });
  }
};

export const handleGetAllAccounts = async (req: Request, res: Response) => {
  try {
    const result = await getAllAccountsFromDB();
    res.status(200).json({
      success: true,
      message: 'Fetched all accounts',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch accounts',
    });
  }
};

export const handleGetMyAccounts = async (req: any, res: Response) => {
  try {
    console.log(req?.user.userEmail)
    const result = await getMyAccountsFromDB(req?.user.userEmail);
    res.status(200).json({
      success: true,
      message: 'Fetched all accounts',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch accounts',
    });
  }
};

export const handleGetAccountById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getAccountByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Fetched account by ID',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch account by ID',
    });
  }
};
