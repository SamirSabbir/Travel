import { WorkRecordModel } from '../workRecords/workRecord.model';
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

export const getAllEmployeesWorks = async () => {
  return await WorkModel.find();
};

export const updateWorkStatusWithEmployee = async (
  _id: string,
  employeeEmail: string,
  data: TWork,
) => {
  const result = await WorkModel.findOneAndUpdate(
    { _id, employeeEmail },
    {
      pax: data.pax,
      country: data.country,
      submissionDate: data.submissionDate,
      employeeEmail: data.employeeEmail,
    },
  );
  if (data.employeeEmail) {
    await WorkRecordModel.create({
      workId: _id,
      assignedTo: data.employeeEmail,
      assignedBy: employeeEmail,
    });
  }
  return result;
};

export const updateWorkStatusSuperAdmin = async (_id: string, data: TWork) => {
  return await WorkModel.findOneAndUpdate(
    { _id },
    {
      pax: data.pax,
      country: data.country,
      submissionDate: data.submissionDate,
      employeeEmail: data.employeeEmail,
      payment: data.payment,
      paymentStatus: data.paymentStatus,
    },
  );
};

export const updateWorkStatusAccountAdmin = async (
  _id: string,
  data: TWork,
) => {
  return await WorkModel.findOneAndUpdate(
    { _id },
    { payment: data.payment, paymentStatus: data.paymentStatus },
  );
};

export const getPipelineDataFromDB = async (employeeEmail: string) => {
  return await WorkModel.find({ employeeEmail }).select({
    name: true,
    phone: true,
    status: true,
  });
};

export const getAdminPipelineDataFromDB = async () => {
  return await WorkModel.find().select({
    name: true,
    phone: true,
    status: true,
  });
};

export const getMyPipelineDataFromDB = async (employeeEmail: string) => {
  return await WorkModel.find({ employeeEmail }).select({
    name: true,
    phone: true,
    status: true,
  });
};
