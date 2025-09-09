import { WorkRecordModel } from '../workRecords/workRecord.model';
import { TWork } from './work.interface';
import { WorkModel } from './work.model';

export const createWorkInDB = async (data: TWork) => {
  return await WorkModel.create(data);
};

export const getAllWorkFromDB = async () => {
  return await WorkModel.find({ leadsStatus: 'Confirmed' }).populate(
    'paymentDetails',
  );
};

export const getAllEmployeeWorks = async (employeeEmail: string) => {
  return await WorkModel.find({
    employeeEmail,
    leadsStatus: 'Confirmed',
  }).populate('paymentDetails');
};

export const getAllEmployeesWorks = async () => {
  return await WorkModel.find({ leadsStatus: 'Confirmed' }).populate(
    'paymentDetails',
  );
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
      status: data.status,
      uniqueName: data.uniqueName,
    },
  );
  if (!result) {
    throw new Error('Invalid work ID');
  }
  if (data.employeeEmail) {
    if (data.employeeEmail !== employeeEmail) {
      await WorkRecordModel.create({
        workId: _id,
        assignedTo: data.employeeEmail,
        assignedBy: employeeEmail,
      });
    }
  }
  return result;
};

export const updateWorkStatusSuperAdmin = async (
  _id: string,
  data: TWork,
  superAdminEmail: string,
) => {
  const result = await WorkModel.findOneAndUpdate(
    { _id, leadsStatus: 'Confirmed' },
    {
      pax: data.pax,
      country: data.country,
      submissionDate: data.submissionDate,
      employeeEmail: data.employeeEmail,
      payment: data.payment,
      paymentStatus: data.paymentStatus,
      status: data.status,
      uniqueName: data.uniqueName,
    },
  );
  if (!result) {
    throw new Error('Invalid work ID');
  }
  if (data.employeeEmail) {
    if (data.employeeEmail !== superAdminEmail) {
      await WorkRecordModel.create({
        workId: _id,
        assignedTo: data.employeeEmail,
        assignedBy: superAdminEmail,
      });
    }
  }
  return result;
};

export const updateWorkStatusAccountAdmin = async (
  _id: string,
  data: TWork,
) => {
  return await WorkModel.findOneAndUpdate(
    { _id, leadsStatus: 'Confirmed' },
    { payment: data.payment, paymentStatus: data.paymentStatus },
  );
};

export const getPipelineDataFromDB = async (employeeEmail: string) => {
  return await WorkModel.find({
    employeeEmail,
    leadsStatus: { $not: /Confirmed/i },
  }).select({
    name: true,
    phone: true,
    status: true,
  });
};

export const getAdminPipelineDataFromDB = async () => {
  return await WorkModel.find({
    leadsStatus: { $not: /Confirmed/i },
  }).select({
    name: true,
    phone: true,
    status: true,
  });
};

export const getMyPipelineDataFromDB = async (employeeEmail: string) => {
  return await WorkModel.find({
    employeeEmail,
    leadsStatus: { $not: /Confirmed/i },
  }).select({
    name: true,
    phone: true,
    status: true,
  });
};
