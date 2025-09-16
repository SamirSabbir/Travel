import { SalaryCertificateModel } from './salaryCertificate.model';
import { ISalaryCertificate } from './salaryCertificate.interface';

export const getAllSalaryCertificatesFromDB = async () => {
  return await SalaryCertificateModel.find();
};

export const getSalaryCertificateByAssignedToFromDB = async (userEmail: string) => {
  return await SalaryCertificateModel.findOne({ assignedTo: userEmail });
};

export const updateSalaryCertificateByIdInDB = async (
  id: string,
  userEmail: string,
  updateData: Partial<ISalaryCertificate>,
) => {
  const result = await SalaryCertificateModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
    { new: true }
  );
  return result;
};

export const createSalaryCertificateInDB = async (data: ISalaryCertificate) => {
  return await SalaryCertificateModel.create(data);
};
