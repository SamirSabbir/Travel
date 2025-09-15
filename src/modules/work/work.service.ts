import { TPayment } from '../payment/payment.interface';
import { PaymentModel } from '../payment/payment.model';
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
    { _id, employeeEmail, isApplied: false },
    {
      pax: data.pax,
      country: data.country,
      submissionDate: data.submissionDate,
      service: data.service,
    },
  );
  if (!result) {
    throw new Error('Invalid work ID');
  }
  return result;
};

export const assignWorkWithEmployee = async (
  _id: string,
  employeeEmail: string,
  data: { employeeEmail: string },
) => {
  if (data.employeeEmail !== employeeEmail) {
    const result = await WorkModel.findOneAndUpdate(
      { _id, employeeEmail, workStatus: 'Completed' },
      {
        employeeEmail: data.employeeEmail,
      },
    );
    await WorkRecordModel.create({
      workId: _id,
      assignedTo: data.employeeEmail,
      assignedBy: employeeEmail,
    });
    return result;
  }
  throw Error('Employee already assigned');
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
      workStatus: data.workStatus,
      service: data.service,
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
    workStatus: true,
  });
};

export const getAdminPipelineDataFromDB = async () => {
  return await WorkModel.find({
    leadsStatus: { $not: /Confirmed/i },
  }).select({
    name: true,
    phone: true,
    workStatus: true,
  });
};

export const getMyPipelineDataFromDB = async (employeeEmail: string) => {
  return await WorkModel.find({
    employeeEmail,
    leadsStatus: { $not: /Confirmed/i },
  }).select({
    name: true,
    phone: true,
    workStatus: true,
  });
};

export const getAllUnapprovedWorksFromDB = async () => {
  return await WorkModel.find({
    isApplied: true,
    workStatus: 'Pending',
  }).populate('paymentDetails');
};

export const approveWorkInDB = async (_id: string) => {
  return await WorkModel.updateOne(
    {
      _id,
      isApplied: true,
      workStatus: 'Pending',
    },
    {
      workStatus: 'Completed',
    },
  );
};

export const cancelWorkInDB = async (_id: string) => {
  return await WorkModel.updateOne(
    {
      _id,
      isApplied: true,
      workStatus: 'Pending',
    },
    {
      isApplied: false,
    },
  );
};

export const directApproveWorkInDB = async (_id: string, data: TPayment) => {
  await PaymentModel.updateOne({ workId: _id }, { ...data });
  return await WorkModel.updateOne(
    {
      _id,
      workStatus: 'Pending',
    },
    {
      workStatus: 'Completed',

      payment: data.amount,
      paymentStatus: data.paymentStatus,
    },
  );
};

export const applyForApproveWorkInDB = async (_id: string, data: TPayment) => {
  await PaymentModel.updateOne({ workId: _id }, { ...data });
  return await WorkModel.updateOne(
    {
      _id,
      isApplied: false,
      workStatus: 'Pending',
    },
    {
      isApplied: true,
      payment: data.amount,
      paymentStatus: data.paymentStatus,
    },
  );
};
