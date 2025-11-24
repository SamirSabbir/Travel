import { SpecialRequestModel } from './specialRequest.model';
import { ISpecialRequest } from './specialRequest.interface';
import { UserModel } from '../user/user.model';
import { NotificationService } from '../notifications/notifications.services';

const SUPER_ADMIN_EMAIL = 'superadmin@example.com'; // adjust as needed

// Get all pending special requests
export const getAllSpecialRequestsFromDB = async () => {
  return await SpecialRequestModel.find();
};

// Get special request by assigned user
export const getSpecialRequestByAssignedToFromDB = async (
  userEmail: string,
) => {
  return await SpecialRequestModel.findOne({ userEmail });
};

// Create a new special request
export const createSpecialRequestInDB = async (
  userEmail: string,
  data: ISpecialRequest,
) => {
  const user = await UserModel.findOne({ email: userEmail });
  if (!user) throw new Error('User not found');

  // Validation
  if (data.type === 'CasualLeave') {
    if (
      !data.leaveDates ||
      data.leaveDates.length > user.remainingCasualLeaves
    ) {
      throw new Error(
        `You only have ${user.remainingCasualLeaves} casual leaves remaining`,
      );
    }
  }

  if (data.type === 'SickLeave') {
    if (!data.leaveDates || data.leaveDates.length > user.remainingSickLeaves) {
      throw new Error(
        `You only have ${user.remainingSickLeaves} sick leaves remaining`,
      );
    }
  }

  if (data.type === 'CommissionWithdrawal') {
    if ((data.commissionAmount ?? 0) > user?.commission) {
      throw new Error(
        `You only have ${user.commission} commission balance available`,
      );
    }
  }

  const request = await SpecialRequestModel.create({
    ...data,
    userEmail,
    userRole: user.role,
    userName: user.name,
  });

  // Find all Account Admins
  const accountAdmins = await UserModel.find(
    {
      role: 'AccountAdmin',
      isApproved: true, // Only send to approved account admins
    },
    { email: 1, name: 1 },
  );

  // Send notification to Super Admin
  await NotificationService.createNotification(
    `New Special Request created by ${user.name} (${data.type})`,
    SUPER_ADMIN_EMAIL,
    {
      requestId: request._id,
      type: 'special_request_created',
    },
  );

  // Send notification to all Account Admins
  if (accountAdmins.length > 0) {
    const notificationPromises = accountAdmins.map((admin) =>
      NotificationService.createNotification(
        `New Special Request applied by ${user.name} (${data.type})`,
        admin.email,
        {
          requestId: request._id,
          type: 'special_request_created',
        },
      ),
    );

    // Wait for all notifications to be sent
    await Promise.all(notificationPromises);

    console.log(
      `📨 Notifications sent to ${accountAdmins.length} Account Admins`,
    );
  }

  return request;
};
// Approve special request by ID
export const approveSpecialRequestByIdInDB = async (
  id: string,
  adminEmail: string,
) => {
  const request = await SpecialRequestModel.findById(id);
  if (!request) throw new Error('Request not found');

  const user = await UserModel.findOne({ email: request.userEmail });
  if (!user) throw new Error('User not found');

  // Deduct balances
  if (request.type === 'CasualLeave' && request.leaveDates) {
    user.remainingCasualLeaves -= request.leaveDates.length;
  }

  if (request.type === 'SickLeave' && request.leaveDates) {
    user.remainingSickLeaves -= request.leaveDates.length;
  }

  if (request.type === 'CommissionWithdrawal') {
    user.commission -= request.commissionAmount ?? 0;
  }

  await user.save();

  const result = await SpecialRequestModel.findOneAndUpdate(
    { _id: id },
    { approved: true, approvedBy: adminEmail },
    { new: true },
  );

  // Send small notification to the user
  await NotificationService.createNotification(
    `Your Special Request "${request.type}" has been approved by ${adminEmail}`,
    request.userEmail,
    { requestId: result?._id },
  );

  return result;
};

// Cancel special request by ID
export const cancelSpecialRequestByIdInDB = async (
  id: string,
  userEmail: string,
) => {
  const request = await SpecialRequestModel.findOneAndUpdate(
    { _id: id },
    { cancelled: true, cancelledBy: userEmail },
    { new: true },
  );

  // Send small notification to the user
  if (request?.userEmail) {
    await NotificationService.createNotification(
      `Your Special Request "${request.type}" has been cancelled by ${userEmail}`,
      request.userEmail,
      { requestId: request._id },
    );
  }

  return request;
};
