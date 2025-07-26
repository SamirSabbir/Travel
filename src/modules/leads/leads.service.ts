import { TLeads } from "./leads.interface";
import LeadModel from "./leads.model";


export const createLeadInDB = async (data: TLeads) => {
  const result = await LeadModel.create(data);
  return result
};

export const getAllLeadsFromDB = async () => {
  const result = await LeadModel.find()
  return result;
};

// Add this to your existing service functions
export const assignEmailToLeadInDB = async (leadId: string, email: string) => {
  const result = await LeadModel.findByIdAndUpdate(
    leadId,
    { $addToSet: { assigns: email } },
    { new: true }
  );
  
  if (!result) {
    throw new Error('Lead not found');
  }
  
  return result;
};

export const getAssignedLeadsFromDB = async (email: string) => {
  const result = await LeadModel.find({ assigns: email });
  return result;
};