import { INOC } from '../NOC/noc.interface';
import { NOCModel } from '../NOC/noc.model';
import { NotificationService } from '../notifications/notifications.services'; // import notification service

export const getAllNOCsFromDB = async () => {
  return await NOCModel.find({ approved: false, cancelled: false });
};

export const getNOCByAssignedToFromDB = async (userEmail: string) => {
  return await NOCModel.findOne({ assignedTo: userEmail });
};

export const createNOCInDB = async (data: INOC) => {
  const noc = await NOCModel.create(data);

  // Small notification to assigned user
  if (noc.assignedTo) {
    await NotificationService.createNotification(
      `New NOC assigned to you: ${noc.title || 'N/A'}`,
      noc.assignedTo,
      { nocId: noc._id },
    );
  }

  return noc;
};

export const ApproveNOCByIdInDB = async (id: string, userEmail: string) => {
  const result = await NOCModel.findOneAndUpdate(
    { _id: id },
    { approved: true, approvedBy: userEmail },
    { new: true },
  );

  if (result?.assignedTo) {
    // Small notification to assigned user
    await NotificationService.createNotification(
      `Your NOC "${result.title || 'N/A'}" has been approved by ${userEmail}`,
      result.assignedTo,
      { nocId: result._id },
    );
  }

  return result;
};

export const cancelNOCByIdInDB = async (id: string, userEmail: string) => {
  const result = await NOCModel.findOneAndUpdate(
    { _id: id },
    { cancelled: true, cancelledBy: userEmail },
    { new: true },
  );

  if (result?.assignedTo) {
    // Small notification to assigned user
    await NotificationService.createNotification(
      `Your NOC "${result.title || 'N/A'}" has been cancelled by ${userEmail}`,
      result.assignedTo,
      { nocId: result._id },
    );
  }

  return result;
};
