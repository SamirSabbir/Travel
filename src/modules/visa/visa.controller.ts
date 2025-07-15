import { Request, Response } from 'express';
import {
  createNonUsVisaData,
  createUSVisaPaymentData,
  createUSRetrieveDSData,
  getAllUSVisaPaymentDataFromDB,
  getAllUSRetrieveDSDataFromDB,
  getAllNonUSVisaDataFromDB,
} from './visa.service';

// 1. Controller for creating Non-US Visa entry
export const handleCreateNonUSVisa = async (req: Request, res: Response) => {
  try {
    const result = await createNonUsVisaData({...req.body, employeeEmail:req?.user?.userEmail });
    res.status(201).json({
      success: true,
      message: 'Non-US visa entry created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create Non-US visa entry',
    });
  }
};

// 2. Controller for creating US Visa Payment entry
export const handleCreateUSVisaPayment = async (req: Request, res: Response) => {
  try {
    const result = await createUSVisaPaymentData({...req.body, employeeEmail:req?.user?.userEmail });
    res.status(201).json({
      success: true,
      message: 'US Visa payment entry created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create US Visa payment entry',
    });
  }
};

// 3. Controller for creating DS-160 Retrieval entry
export const handleCreateUSRetrieveDS = async (req: Request, res: Response) => {
  try {
    const result = await createUSRetrieveDSData({...req.body, employeeEmail:req?.user?.userEmail });
    res.status(201).json({
      success: true,
      message: 'DS-160 retrieval entry created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create DS-160 retrieval entry',
    });
  }
};

export const handleGetAllNonUSVisa = async (req: Request, res: Response) => {
  try {
    const result = await getAllNonUSVisaDataFromDB(req?.user?.userEmail);
    res.status(200).json({
      success: true,
      message: 'Fetched all Non-US visa entries',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch Non-US visa entries',
    });
  }
};

export const handleGetAllUSVisaPayment = async (req: Request, res: Response) => {
  try {
    const result = await getAllUSVisaPaymentDataFromDB(req?.user?.userEmail);
    res.status(200).json({
      success: true,
      message: 'Fetched all US Visa payment entries',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch US Visa payment entries',
    });
  }
};

export const handleGetAllUSRetrieveDS = async (req: Request, res: Response) => {
  try {
    const result = await getAllUSRetrieveDSDataFromDB(req?.user?.userEmail);
    res.status(200).json({
      success: true,
      message: 'Fetched all DS-160 retrieval entries',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch DS-160 retrieval entries',
    });
  }
};