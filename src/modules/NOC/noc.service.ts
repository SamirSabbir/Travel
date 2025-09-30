import { INOC } from './noc.interface';
import { NOCModel } from './noc.model';
import { NotificationService } from '../notifications/notifications.services';

export const getAllNOCsFromDB = async () => {
  return await NOCModel.find({ approved: false, cancelled: false });
};

// Get NOC by assigned email
export const getNOCByAssignedToFromDB = async (email: string) => {
  return await NOCModel.findOne({ email });
};

// Create a new NOC
export const createNOCInDB = async (data: INOC) => {
  const noc = await NOCModel.create(data);

  // Small notification to the employee
  if (noc.email) {
    await NotificationService.createNotification(
      `New NOC request created for ${noc.name} (${noc.purpose})`,
      noc.email,
      { nocId: noc._id },
    );
  }

  return noc;
};

// Approve NOC by ID
export const ApproveNOCByIdInDB = async (id: string, userEmail: string) => {
  const result = await NOCModel.findOneAndUpdate(
    { _id: id },
    { approved: true, approvedBy: userEmail },
    { new: true },
  );

  if (result?.email) {
    // Small notification to the employee
    await NotificationService.createNotification(
      `Your NOC for ${result.name} (${result.purpose}) has been approved by ${userEmail}`,
      result.email,
      { nocId: result._id },
    );
  }

  return result;
};

// Cancel NOC by ID
export const cancelNOCByIdInDB = async (id: string, userEmail: string) => {
  const result = await NOCModel.findOneAndUpdate(
    { _id: id },
    { cancelled: true, cancelledBy: userEmail },
    { new: true },
  );

  if (result?.email) {
    // Small notification to the employee
    await NotificationService.createNotification(
      `Your NOC for ${result.name} (${result.purpose}) has been cancelled by ${userEmail}`,
      result.email,
      { nocId: result._id },
    );
  }

  return result;
};
