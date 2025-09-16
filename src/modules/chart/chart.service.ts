import { KPIChartModel } from './chart.model';

export const getKPIOfEmployeeFromDB = async (employeeId: string) => {
  console.log(employeeId);
  const result = await KPIChartModel.find({ employeeId }).populate(
    'employeeId',
  );
  return result;
};

export const getCommissionOfEmployeeFromDB = async (employeeId: string) => {
  const result = await KPIChartModel.find({ employeeId });
  return result;
};
