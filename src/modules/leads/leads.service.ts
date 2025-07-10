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
