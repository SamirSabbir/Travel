import { ActivityService } from '../activity/activity.service';
import { AppointmentDateModel } from '../appointmentDate/appointmentDate.model';
import { HotelModel } from '../hotel/hotel.model';
import { NotificationService } from '../notifications/notifications.services';
import { TPayment } from '../payment/payment.interface';
import { PaymentModel } from '../payment/payment.model';
import { TicketModel } from '../ticket/ticket.model';
import { TourPackageModel } from '../tourPackage/tourPackage.model';
import { TransferModel } from '../transfer/transfer.model';
import { UserModel } from '../user/user.model';
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
    data,
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
    leadsStatus: { $not: { $regex: '^Confirmed$', $options: 'i' } },
  }).select({
    name: true,
    phone: true,
    workStatus: true,
    leadsStatus: true,
  });
};

export const getAdminPipelineDataFromDB = async () => {
  return await WorkModel.find({
    leadsStatus: { $not: { $regex: '^Confirmed$', $options: 'i' } },
  }).select({
    name: true,
    phone: true,
    workStatus: true,
    leadsStatus: true,
  });
};

export const getMyPipelineDataFromDB = async (employeeEmail: string) => {
  return await WorkModel.find({
    employeeEmail,
    leadsStatus: { $not: { $regex: '^Confirmed$', $options: 'i' } },
  }).select({
    name: true,
    phone: true,
    workStatus: true,
    leadsStatus: true,
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
  if (!work) {
    throw new Error('Work not found!');
  }

  let updatedWork;

  // Case 2: Full Payment → Completed
  if (work.paymentStatus === 'Full Payment') {
    updatedWork = await WorkModel.findOneAndUpdate(
      { _id, isApplied: true, workStatus: 'Pending' },
      { workStatus: 'Completed' },
      { new: true },
    );
  }
  // Case 1: Partial Payment → stays Pending
  else {
    updatedWork = await WorkModel.findOneAndUpdate(
      { _id, isApplied: true, workStatus: 'Pending' },
      { workStatus: 'Pending', isApplied: false },
      { new: true },
    );
  }

  // ✅ Send small notification only to the employee who applied
  if (updatedWork && work.employeeEmail) {
    await NotificationService.createNotification(
      `Your work "${work?.name}" has been approved with status "${updatedWork?.workStatus}" and payment "${work.paymentStatus}".`,
      work?.employeeEmail,
      { workId: work._id },
    );
  }

  return updatedWork;
};

export const cancelWorkInDB = async (_id: string) => {
  const work = await WorkModel.findOne({ _id });
  if (!work) {
    throw new Error('Work not found!');
  }

  const updatedWork = await WorkModel.findOneAndUpdate(
    {
      _id,
      isApplied: true,
      workStatus: 'Pending',
    },
    {
      isApplied: false,
    },
    { new: true },
  );

  // ✅ Small notification only to employee
  if (updatedWork && work.employeeEmail) {
    await NotificationService.createNotification(
      `Your work "${work.name}" has been canceled while it was pending approval.`,
      work.employeeEmail,
      { workId: work._id },
    );
  }

  return updatedWork;
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

export const applyForApproveWorkInDB = async (
  _id: string,
  data: TPayment & {
    userEmail: string;
    userName: string;
  },
) => {
  // 1. Update Payment details
  await PaymentModel.updateOne({ workId: _id }, { ...data });

  // 2. Update Work details
  const work = await WorkModel.findOneAndUpdate(
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
    { new: true },
  );

  // 3. If update was successful, record an activity + create notifications
  if (work) {
    // Big notification (Employee Activity)
    await ActivityService.recordActivity({
      userEmail: data.userEmail,
      userName: data.userName,
      workId: work._id.toString(),
      action: 'Applied for Approval',
      message: `Applied for approval with payment of ${data.amount} (${data.paymentStatus}).`,
      meta: {
        amount: data.amount,
        status: data.paymentStatus,
      },
    });

    // Small notifications → SuperAdmin + all AccountAdmins
    const targetEmails: string[] = ['superadmin@example.com'];

    // find all AccountAdmins
    const accountAdmins = await UserModel.find(
      { role: 'AccountAdmin' },
      { email: 1 },
    ).lean();

    accountAdmins.forEach((admin) => {
      if (admin.email) targetEmails.push(admin.email);
    });

    // send notifications to all target admins
    await Promise.all(
      targetEmails.map((email) =>
        NotificationService.createNotification(
          `${data.userEmail} applied for approval of work named "${work.name}"`,
          email,
          { workId: work._id },
        ),
      ),
    );
  }

  return work;
};

export const assignServiceInDB = async (workId: string, data: any) => {
  const { assignedTo, services, userEmail, userName } = data;

  // 1. Update work with assigned employee
  const work = await WorkModel.findOneAndUpdate(
    { _id: workId },
    { serviceAssignedTo: assignedTo, services, isServiceAssigned: true },
    { new: true },
  );

  if (!work) {
    throw new Error('Work not found!');
  }

  // 2. Assign selected services
  for (const service of services) {
    switch (service) {
      case 'visa':
        await VisaModel.create({ workId, assignedTo });
        break;

      case 'hotel':
        await HotelModel.create({ workId, assignedTo });
        break;

      case 'transfer':
        await TransferModel.create({ workId, assignedTo });
        break;

      case 'ticket':
        await TicketModel.create({ workId, assignedTo });
        break;

      case 'tourPackage':
        await TourPackageModel.create({ workId, assignedTo });
        break;

      case 'appointmentDate':
        await AppointmentDateModel.create({ workId, assignedTo });
        break;

      default:
        console.log(`Unknown service: ${service}`);
    }
  }

  // 3. Small notification only if assignedTo is not the same as the assigner
  if (assignedTo && assignedTo !== userEmail) {
    await NotificationService.createNotification(
      `You have been assigned new services [${services.join(', ')}] for work "${work.name}".`,
      assignedTo,
      { workId: work._id },
    );
  }

  // 4. Big notification (Employee Activity)
  await ActivityService.recordActivity({
    userEmail: userEmail,
    userName: userName,
    workId: work._id.toString(),
    action: 'Service Assigned',
    message: `Assigned services [${services.join(', ')}] to ${assignedTo} for work "${work.name}".`,
    meta: {
      assignedTo,
      services,
    },
  });

  return work;
};
