import { AppointmentDateModel } from '../appointmentDate/appointmentDate.model';
import { HotelModel } from '../hotel/hotel.model';
import { TPayment } from '../payment/payment.interface';
import { PaymentModel } from '../payment/payment.model';
import { TicketModel } from '../ticket/ticket.model';
import { TourPackageModel } from '../tourPackage/tourPackage.model';
import { TransferModel } from '../transfer/transfer.model';
import { VisaModel } from '../visa/visa.model';
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
  const work = await WorkModel.findOne({ _id });
  if (work?.paymentStatus === 'Partial Payment') {
    return await WorkModel.updateOne(
      {
        _id,
        isApplied: true,
        workStatus: 'Pending',
      },
      {
        workStatus: 'Pending',
      },
    );
  }
  if (work?.paymentStatus === 'Full Payment') {
    return await WorkModel.updateOne(
      {
        _id,
        isApplied: true,
        workStatus: 'Pending',
      },
      {
        workStatus: 'Pending',
      },
    );
  }
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
  if (data.paymentStatus === 'Partial Payment') {
    await PaymentModel.updateOne({ workId: _id }, { ...data });
    return await WorkModel.updateOne(
      {
        _id,
        workStatus: 'Pending',
      },
      {
        payment: data.amount,
        paymentStatus: data.paymentStatus,
      },
    );
  } else {
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
  }
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

export const assignServiceInDB = async (workId: string, data: any) => {
  const { assignedTo, services } = data;
  await WorkModel.updateOne({ _id: workId }, { serviceAssignedTo: assignedTo });
  for (const service of services) {
    switch (service) {
      case 'visa':
        if (data.visa) await VisaModel.create({ workId, assignedTo });
        break;

      case 'hotel':
        if (data.hotel) await HotelModel.create({ workId, assignedTo });
        break;

      case 'transfer':
        if (data.transfer) await TransferModel.create({ workId, assignedTo });
        break;

      case 'ticket':
        if (data.ticket) await TicketModel.create({ workId, assignedTo });
        break;

      case 'tourPackage':
        if (data.tourPackage)
          await TourPackageModel.create({ workId, assignedTo });
        break;

      case 'appointmentDate':
        if (data.appointmentDate)
          await AppointmentDateModel.create({ workId, assignedTo });
        break;

      default:
        console.log(`Unknown service: ${service}`);
    }
  }
};
