import { SalaryCertificateModel } from './salaryCertificate.model';
import { ISalaryCertificate } from './salaryCertificate.interface';

export const getAllSalaryCertificatesFromDB = async () => {
  return await SalaryCertificateModel.find();
};

export const getSalaryCertificateByAssignedToFromDB = async (
  userEmail: string,
) => {
  return await SalaryCertificateModel.findOne({ assignedTo: userEmail });
};

export const approveSalaryCertificateByIdInDB = async (
  id: string,
  userEmail: string,
) => {
  const result = await SalaryCertificateModel.findOneAndUpdate(
    { _id: id },
    { approved: true, approvedBy: userEmail },
  );
  return result;
};

export const createSalaryCertificateInDB = async (data: ISalaryCertificate) => {
  return await SalaryCertificateModel.create(data);
};
