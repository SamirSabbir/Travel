import { SalesModel } from '../sales/sales.model';
import { TLeads } from './leads.interface';
import LeadModel from './leads.model';

export const createLeadInDB = async (data: TLeads) => {
  const result = await LeadModel.create(data);
  if (data) {
    await SalesModel.create({
      customerName: data.customerName,
      phoneNumber: data.customerPhone,
      description: data.description,
      employeeEmails: data?.assigns,
      leadId: result._id,
    });
  }
  return result;
};

export const getAllLeadsFromDB = async () => {
  const result = await LeadModel.find();
  return result;
};

// Add this to your existing service functions
export const assignEmailToLeadInDB = async (leadId: string, email: string) => {
  const result = await LeadModel.findByIdAndUpdate(
    leadId,
    { $addToSet: { assigns: email } },
    { new: true },
  );

  if (!result) {
    throw new Error('Lead not found');
  }

  if (result) {
    await SalesModel.findOneAndUpdate(
      { customerName: result.customerName },
      { $addToSet: { employeeEmails: email } },
      { new: true },
    );
  }

  return result;
};

export const getAssignedLeadsFromDB = async (email: string) => {
  const result = await LeadModel.find({ assigns: email });
  return result;
};
