import { INOC } from './noc.interface';
import { NOCModel } from './noc.model';
import { NotificationService } from '../notifications/notifications.services';
import { UserModel } from '../user/user.model';

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

  // Find all Account Admins and Super Admin
  const [accountAdmins, superAdmin] = await Promise.all([
    UserModel.find(
      {
        role: 'AccountAdmin',
        isApproved: true,
      },
      { email: 1, name: 1 },
    ),
    UserModel.findOne({ role: 'SuperAdmin' }, { email: 1, name: 1 }),
  ]);

  // Prepare notification messages
  const employeeMessage = `Your NOC request for ${noc.purpose} has been submitted successfully`;
  const adminMessage = `New NOC request created for ${noc.name} (${noc.purpose})`;

  const notificationContext = {
    nocId: noc._id,
    type: 'noc_created',
    employeeName: noc.name,
    employeeEmail: noc.email,
    purpose: noc.purpose,
  };

  // Send notifications to all recipients
  const notificationPromises = [];

  // Send to Employee (original functionality)
  if (noc.email) {
    notificationPromises.push(
      NotificationService.createNotification(employeeMessage, noc.email, {
        ...notificationContext,
        type: 'noc_submission_confirmation',
      }),
    );
  }

  // Send to Super Admin if exists
  if (superAdmin) {
    notificationPromises.push(
      NotificationService.createNotification(
        adminMessage,
        superAdmin.email,
        notificationContext,
      ),
    );
  }

  // Send to all Account Admins
  if (accountAdmins.length > 0) {
    accountAdmins.forEach((admin) => {
      notificationPromises.push(
        NotificationService.createNotification(
          adminMessage,
          admin.email,
          notificationContext,
        ),
      );
    });
  }

  // Wait for all notifications to be sent
  if (notificationPromises.length > 0) {
    await Promise.all(notificationPromises);
    console.log(`📨 NOC notifications sent to:
    - Employee: ${noc.email ? 'Yes' : 'No'}
    - Super Admin: ${superAdmin ? 'Yes' : 'No'}
    - Account Admins: ${accountAdmins.length}`);
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
