import { SalaryCertificateModel } from './salaryCertificate.model';
import { ISalaryCertificate } from './salaryCertificate.interface';
import { NotificationService } from '../notifications/notifications.services';

const SUPER_ADMIN_EMAIL = 'superadmin@example.com'; // adjust if needed

export const getAllSalaryCertificatesFromDB = async () => {
  return await SalaryCertificateModel.find({
    approved: false,
    cancelled: false,
  });
};

export const getSalaryCertificateByAssignedToFromDB = async (
  userEmail: string,
) => {
  return await SalaryCertificateModel.findOne({ assignedTo: userEmail });
};

// Create a new Salary Certificate
export const createSalaryCertificateInDB = async (data: ISalaryCertificate) => {
  const salaryCert = await SalaryCertificateModel.create(data);

  // Small notification to super admin
  await NotificationService.createNotification(
    `New Salary Certificate request created for ${salaryCert.name}`,
    SUPER_ADMIN_EMAIL,
    { salaryCertificateId: salaryCert._id },
  );

  return salaryCert;
};

// Approve Salary Certificate by ID
export const approveSalaryCertificateByIdInDB = async (
  id: string,
  userEmail: string,
) => {
  const result = await SalaryCertificateModel.findOneAndUpdate(
    { _id: id },
    { approved: true, approvedBy: userEmail },
    { new: true },
  );

  if (result?.email) {
    // Small notification to the employee
    await NotificationService.createNotification(
      `Your Salary Certificate "${result.name}" has been approved by ${userEmail}`,
      result.email,
      { salaryCertificateId: result._id },
    );
  }

  return result;
};

// Cancel Salary Certificate by ID
export const cancelSalaryCertificateByIdInDB = async (
  id: string,
  userEmail: string,
) => {
  const result = await SalaryCertificateModel.findOneAndUpdate(
    { _id: id },
    { cancelled: true, cancelledBy: userEmail },
    { new: true },
  );

  if (result?.email) {
    // Small notification to the employee
    await NotificationService.createNotification(
      `Your Salary Certificate "${result.name}" has been cancelled by ${userEmail}`,
      result.email,
      { salaryCertificateId: result._id },
    );
  }

  return result;
};
