import { ActivityModel } from '../activity/activity.model';
import { ActivityService } from '../activity/activity.service';
import { PaymentModel } from '../payment/payment.model';
import { WorkModel } from '../work/work.model';
import { TLeads } from './leads.interface';
import { LeadsModel } from './leads.model';
import { v4 as uuidv4 } from 'uuid';

// export const createLeadsEntryInDB = async (data: TLeads) => {
//   const result = await LeadsModel.create(data);
//   if (result) {
//     await WorkModel.create({
//       name: data.customerName,
//       employeeEmail: data.employeeEmail,
//       LeadsId: result._id,
//       status:data?.status
//     });
//   }
//   return result;
// };

export const getAllLeadsFromDB = async () => {
  const result = await LeadsModel.find().populate('leadId');
  return result;
};

export const updateLeadsDataIntoDB = async (_id: string, data: TLeads) => {
  const result = await LeadsModel.findOneAndUpdate({ _id }, data);
  return result;
};

export const getAllEmployeeLeads = async (employeeEmail: string) => {
  const result = await LeadsModel.find({ employeeEmails: employeeEmail });
  return result;
};

export const updateConfirmLeads = async (
  _id: string,
  employeeEmail: string,
  data: any,
) => {
  const result = await LeadsModel.findOneAndUpdate(
    { _id, employeeEmails: employeeEmail },
    { isConfirmed: data?.status },
    { new: true }, // ✅ return updated doc
  );

  if (!result) {
    throw new Error('Lead not found or employee not authorized');
  }

  const isWorkExist = await WorkModel.findOne({
    leadId: result?._id,
  });

  if (isWorkExist) {
    await WorkModel.updateOne(
      { leadId: result?._id },
      { leadsStatus: data.status },
    );
  } else {
    const paymentDetails = await PaymentModel.create({});

    const work = await WorkModel.create({
      uuId: result?.uuId,
      leadId: result?._id,
      leadsStatus: data.status,
      employeeEmail,
      paymentDetails: paymentDetails._id,
      name: result?.customerName,
      phone: result?.phoneNumber,
    });

    await PaymentModel.updateOne(
      { _id: paymentDetails._id },
      { workId: work._id },
    );
  }

  // ✅ Create Activity (big notification) if status is Confirmed
  if (data.status === 'Confirmed') {
    await ActivityService.recordActivity({
      userEmail: employeeEmail,
      userName: result?.customerName ?? 'Unknown',
      workId: isWorkExist?._id?.toString() ?? null,
      action: 'Lead Confirmed',
      message: `Lead ${result?.customerName} has been confirmed.`,
      meta: {
        phone: result?.phoneNumber,
        leadId: result?._id,
      },
    });
  }

  return result;
};

export const updateConfirmLeadsWithWorkId = async (
  _id: string,
  employeeEmail: string,
  data: any,
) => {
  // 1. Find the work
  const isWorkExist = await WorkModel.findOne({ _id });
  if (!isWorkExist) {
    throw new Error("Work doesn't exist!");
  }

  // 2. Update the leadsStatus
  const work = await WorkModel.findOneAndUpdate(
    { _id },
    { leadsStatus: data.status },
    { new: true },
  );

  // 3. Only record activity if status = "Confirmed"
  if (work && data.status === 'Confirmed') {
    await ActivityService.recordActivity({
      userEmail: employeeEmail,
      userName: work.name ?? 'Unknown',
      workId: work._id.toString(),
      action: 'Lead Confirmed',
      message: `Lead "${work.name}" has been confirmed.`,
      meta: {
        status: data.status,
        leadId: work.leadId,
        phone: work.phone,
      },
    });
  }

  return work;
};
