import { TWork } from './work.interface';
import { WorkModel } from './work.model';

export const createWorkInDB = async (data: TWork) => {
  return await WorkModel.create(data);
};

export const getAllWorkFromDB = async () => {
  return await WorkModel.find().populate('salesId');
};

export const getAllEmployeeWorks = async (employeeEmail: string) => {
  return await WorkModel.find({ employeeEmail });
};

export const updateWorkStatusWithEmployee = async (
  _id: string,
  employeeEmail: string,
  data: TWork,
) => {
  console.log(_id);
  const result = await WorkModel.findOneAndUpdate(
    { _id, employeeEmail },
    {
      pax: data.pax,
      country: data.country,
      submissionDate: data.submissionDate,
      employeeEmail: data.employeeEmail,
    },
  );
  console.log(result);
  return result;
};

export const updateWorkStatusAccountAdmin = async (
  _id: string,
  data: TWork,
) => {
  return await WorkModel.findOneAndUpdate({ _id }, { payment: data.payment });
};

export const getPipelineDataFromDB = async () => {
  return await WorkModel.find().select({
    name: true,
    phone: true,
    status: true,
  });
};

export const getAdminPipelineDataFromDB = async (employeeEmail: string) => {
  return await WorkModel.find({ employeeEmail }).select({
    name: true,
    phone: true,
    status: true,
  });
};
