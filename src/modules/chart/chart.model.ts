import { model, Schema } from 'mongoose';
import { TCommissionChart, TKPIChart } from './chart.interface';

const KPIChartSchema = new Schema<TKPIChart>(
  {
    KPI: {
      type: Number,
      required: true,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const KPIChartModel = model<TKPIChart>('KPIChart', KPIChartSchema);

const CommissionChartSchema = new Schema<TCommissionChart>(
  {
    commission: {
      type: Number,
      required: true,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CommissionChartModel = model<TCommissionChart>(
  'CommissionChart',
  CommissionChartSchema,
);
