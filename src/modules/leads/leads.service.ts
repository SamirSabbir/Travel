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
  );
  console.log(result?._id);
  const isWorkExist = await WorkModel.findOne({
    leadId: result?._id,
  });
  console.log(isWorkExist ? true : false);
  if (isWorkExist) {
    await WorkModel.updateOne(
      { leadId: result?._id },
      {
        leadsStatus: data.status,
      },
    );
  } else {
    const paymentDetails = await PaymentModel.create({});
    const uuId = uuidv4();
    const work = await WorkModel.create({
      uuId,
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
  return result;
};

export const updateConfirmLeadsWithWorkId = async (
  _id: string,
  employeeEmail: string,
  data: any,
) => {
  const isWorkExist = await WorkModel.findOne({
    _id,
  });
  if (!isWorkExist) {
    throw Error("Work doesn't exist!");
  }
  const work = await WorkModel.updateOne(
    { _id },
    {
      leadsStatus: data.status,
    },
  );

  return work;
};
