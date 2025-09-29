import { NOCModel } from './noc.model';
import { INOC } from './noc.interface';
import { NotificationService } from '../notifications/notifications.services'; // import notification service

export const getAllNOCsFromDB = async () => {
  return await NOCModel.find({ approved: false, cancelled: false });
};

// Get NOC by assigned user (email)
export const getNOCByAssignedToFromDB = async (email: string) => {
  return await NOCModel.findOne({ email });
};

// Create a new NOC
export const createNOCInDB = async (data: INOC) => {
  const noc = await NOCModel.create(data);

  // Send small notification to the assigned employee
  if (noc.email) {
    await NotificationService.createNotification(
      `New NOC created for you: ${noc.name} (${noc.purpose})`,
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
    // Small notification to the assigned employee
    await NotificationService.createNotification(
      `Your NOC "${result.name}" has been approved by ${userEmail}`,
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
    // Small notification to the assigned employee
    await NotificationService.createNotification(
      `Your NOC "${result.name}" has been cancelled by ${userEmail}`,
      result.email,
      { nocId: result._id },
    );
  }

  return result;
};
