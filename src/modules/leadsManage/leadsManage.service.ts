import { LeadsModel } from '../leads/leads.model';
import { TLeadsManage } from './leadsManage.interface';
import LeadsManageModel from './leadsManage.model';
import { v4 as uuidv4 } from 'uuid';

export const createLeadsManageInDB = async (data: TLeadsManage) => {
  const result = await LeadsManageModel.create(data);
  const uuId = uuidv4();
  if (data) {
    await LeadsModel.create({
      customerName: data.customerName,
      phoneNumber: data.customerPhone,
      description: data.description,
      employeeEmails: data?.assigns,
      leadManageId: result?._id,
      uuId,
    });
  }
  return result;
};

export const getAllLeadsManageFromDB = async () => {
  const result = await LeadsManageModel.find();
  return result;
};

// Add this to your existing service functions
export const assignEmailToLeadsManageInDB = async (
  leadId: string,
  email: string,
) => {
  const result = await LeadsManageModel.findByIdAndUpdate(
    { _id: leadId },
    { $addToSet: { assigns: email } },
    { new: true },
  );
  if (!result) {
    throw new Error('Lead not found');
  }

  if (result) {
    await LeadsModel.findOneAndUpdate(
      { customerName: result.customerName },
      { $addToSet: { employeeEmails: email } },
      { new: true },
    );
  }

  return result;
};

export const getAssignedLeadsMangageFromDB = async (email: string) => {
  const result = await LeadsManageModel.find({ assigns: email });
  return result;
};
