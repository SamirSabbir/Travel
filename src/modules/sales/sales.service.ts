import { WorkModel } from '../work/work.model';
import { TSales } from './sales.interface';
import { SalesModel } from './sales.model';

// export const createSalesEntryInDB = async (data: TSales) => {
//   const result = await SalesModel.create(data);
//   if (result) {
//     await WorkModel.create({
//       name: data.customerName,
//       employeeEmail: data.employeeEmail,
//       salesId: result._id,
//       status:data?.status
//     });
//   }
//   return result;
// };

export const getAllSalesFromDB = async () => {
  const result = await SalesModel.find().populate('leadId');
  return result;
};

export const updateSalesDataIntoDB = async (_id: string, data: TSales) => {
  const result = await SalesModel.findOneAndUpdate({ _id }, data);
  return result;
};

export const getAllEmployeeSales = async (employeeEmail: string) => {
  const result = await SalesModel.find({ employeeEmails: employeeEmail });
  return result;
};

export const updateConfirmSales = async (
  _id: string,
  employeeEmail: string,
  data: any,
) => {
  const result = await SalesModel.findOneAndUpdate(
    { _id, employeeEmails: employeeEmail },
    { isConfirmed: data?.status },
  );
  console.log(result);
  if (result && data.status === 'Very Interested') {
    await WorkModel.create({
      salesId: result._id,
      employeeEmail,
      name: result.customerName,
      phone: result.phoneNumber,
    });
  }
  return result;
};
