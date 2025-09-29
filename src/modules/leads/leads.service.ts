import { agenda } from '../../schedular/agenda';
import { PaymentModel } from '../payment/payment.model';
import { WorkModel } from '../work/work.model';
import { TLeads } from './leads.interface';
import { LeadsModel } from './leads.model';

/**
 * Helper: Check if status is a follow-up type
 */
const isFollowUpStatus = (status: string) =>
  ['Follow-up', 'Follow-up 1', 'Follow-up 2'].includes(status);

/**
 * Helper: Schedule follow-up reminder
 */
const scheduleFollowUpReminder = async (
  leadId: string,
  employeeEmail: string,
) => {
  // Cancel any existing follow-up jobs for this lead
  await agenda.cancel({ 'data.leadId': leadId, name: 'follow-up reminder' });

  // Schedule a new reminder in 2 minutes (for testing) or 2 days in production
  await agenda.schedule('in 2 minutes', 'follow-up reminder', {
    leadId,
    employeeEmail,
  });
};

export const getAllLeadsFromDB = async () => {
  return LeadsModel.find().populate('leadId');
};

export const updateLeadsDataIntoDB = async (_id: string, data: TLeads) => {
  const result = await LeadsModel.findOneAndUpdate({ _id }, data, {
    new: true,
  });

  // Schedule follow-up reminder if status is a follow-up type
  if (result && isFollowUpStatus(data.status)) {
    await scheduleFollowUpReminder(
      result._id.toString(),
      result?.employeeEmails as any,
    );
  }

  return result;
};

export const getAllEmployeeLeads = async (employeeEmail: string) => {
  return LeadsModel.find({ employeeEmails: employeeEmail });
};

export const updateConfirmLeads = async (
  _id: string,
  employeeEmail: string,
  data: any,
) => {
  const result = await LeadsModel.findOneAndUpdate(
    { _id, employeeEmails: employeeEmail },
    { status: data?.status },
    { new: true },
  );

  if (!result) throw new Error('Lead not found or employee not authorized');

  const isWorkExist = await WorkModel.findOne({ leadId: result._id });

  if (!isWorkExist) {
    const paymentDetails = await PaymentModel.create({});
    const work = await WorkModel.create({
      uuId: result.uuId,
      leadId: result._id,
      leadsStatus: data.status,
      employeeEmail,
      paymentDetails: paymentDetails._id,
      name: result.customerName,
      phone: result.phoneNumber,
    });
    await PaymentModel.updateOne(
      { _id: paymentDetails._id },
      { workId: work._id },
    );
  } else {
    await WorkModel.updateOne(
      { leadId: result._id },
      { leadsStatus: data.status },
    );
  }

  // Schedule follow-up reminder if status is a follow-up type
  if (isFollowUpStatus(data.status)) {
    await scheduleFollowUpReminder(result._id.toString(), employeeEmail);
  } else {
    // Cancel existing reminders if status changed
    await agenda.cancel({
      'data.leadId': result._id.toString(),
      name: 'follow-up reminder',
    });
  }

  return result;
};

export const updateConfirmLeadsWithWorkId = async (
  _id: string,
  employeeEmail: string,
  data: any,
) => {
  const work = await WorkModel.findOneAndUpdate(
    { _id },
    { leadsStatus: data.status },
    { new: true },
  );

  if (!work) throw new Error("Work doesn't exist!");

  if (isFollowUpStatus(data.status)) {
    await scheduleFollowUpReminder(work.leadId.toString(), employeeEmail);
  } else {
    await agenda.cancel({
      'data.leadId': work.leadId.toString(),
      name: 'follow-up reminder',
    });
  }

  return work;
};
