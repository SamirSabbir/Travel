import mongoose from 'mongoose';

export type TKPIChart = {
  KPI: number;
  employeeId: mongoose.Types.ObjectId;
};

export type TCommissionChart = {
  commission: number;
  employeeId: mongoose.Types.ObjectId;
};
