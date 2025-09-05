import { LeadsModel } from '../leads/leads.model';
import { TLeadsManage } from './leadsManage.interface';
import LeadsManageModel from './leadsManage.model';

export const createLeadsManageInDB = async (data: TLeadsManage) => {
  const result = await LeadsManageModel.create(data);
  if (data) {
    await LeadsModel.create({
      customerName: data.customerName,
      phoneNumber: data.customerPhone,
      description: data.description,
      employeeEmails: data?.assigns,
      leadsManageId: result._id,
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
    leadId,
    { $addToSet: { assigns: email } },
    { new: true },
  );

  if (!result) {
    throw new Error('Lead not found');
  }

  if (result) {
    await LeadsManageModel.findOneAndUpdate(
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
