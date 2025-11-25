import { LeadsModel } from '../leads/leads.model';
import { NotificationService } from '../notifications/notifications.services';
import { TLeadsManage } from './leadsManage.interface';
import LeadsManageModel from './leadsManage.model';
import { v4 as uuidv4 } from 'uuid';

const generateShortUuid = () =>
  uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase();

export const createLeadsManageInDB = async (data: TLeadsManage) => {
  const uuId = generateShortUuid(); // <-- now using short uuid

  const result = await LeadsManageModel.create({ ...data, uuId });

  if (data) {
    await LeadsModel.create({
      customerName: data.customerName,
      phoneNumber: data.customerPhone,
      description: data.description,
      employeeEmails: data?.assigns,
      leadManageId: result?._id,
      uuId,
    });

    if (data.assigns && data.assigns.length > 0) {
      for (const email of data.assigns) {
        await NotificationService.createNotification(
          `You have been assigned to a new lead: ${data.customerName}`,
          email,
          {
            type: 'lead_assignment',
            leadId: result._id,
            customerName: data.customerName,
          },
        );
      }
    }

    const adminEmails = ['admin@example.com', 'superadmin@example.com'];

    for (const adminEmail of adminEmails) {
      await NotificationService.createNotification(
        `New lead created: ${data.customerName} assigned to ${data.assigns?.join(', ') || 'no one'}`,
        adminEmail,
        {
          type: 'lead_created',
          leadId: result._id,
          customerName: data.customerName,
        },
      );
    }
  }

  return result;
};

export const getAllLeadsManageFromDB = async () => {
  const result = await LeadsManageModel.find();
  return result;
};

export const assignEmailToLeadsManageInDB = async (
  leadId: string,
  email: string,
  assignedBy?: string, // Add this parameter to know who assigned the lead
) => {
  const result = await LeadsManageModel.findByIdAndUpdate(
    { _id: leadId },
    { $addToSet: { assigns: email } },
    { new: true },
  );

  if (!result) {
    throw new Error('Lead not found');
  }

  if (result) {
    await LeadsModel.findOneAndUpdate(
      { customerName: result.customerName },
      { $addToSet: { employeeEmails: email } },
      { new: true },
    );

    // Notify the assigned employee
    await NotificationService.createNotification(
      `You have been assigned to a lead: ${result.customerName}`,
      email,
      {
        type: 'lead_assignment',
        leadId: result._id,
        customerName: result.customerName,
        assignedBy: assignedBy || 'System',
      },
    );

    // Notify the person who made the assignment (if provided)
    if (assignedBy && assignedBy !== email) {
      await NotificationService.createNotification(
        `You assigned lead ${result.customerName} to ${email}`,
        assignedBy,
        {
          type: 'lead_assignment_made',
          leadId: result._id,
          customerName: result.customerName,
          assignedTo: email,
        },
      );
    }

    // Notify admins about the assignment
    const adminEmails = ['admin@example.com', 'superadmin@example.com']; // Replace with actual admin emails

    for (const adminEmail of adminEmails) {
      if (adminEmail !== email && adminEmail !== assignedBy) {
        await NotificationService.createNotification(
          `Lead ${result.customerName} was assigned to ${email} by ${assignedBy || 'System'}`,
          adminEmail,
          {
            type: 'lead_assignment_admin',
            leadId: result._id,
            customerName: result.customerName,
            assignedTo: email,
            assignedBy: assignedBy || 'System',
          },
        );
      }
    }
  }

  return result;
};

export const getAssignedLeadsMangageFromDB = async (email: string) => {
  const result = await LeadsManageModel.find({ assigns: email });
  return result;
};

// Add a new function to remove assignment with notifications
export const removeEmailFromLeadsManageInDB = async (
  leadId: string,
  email: string,
  removedBy?: string,
) => {
  const result = await LeadsManageModel.findByIdAndUpdate(
    { _id: leadId },
    { $pull: { assigns: email } },
    { new: true },
  );

  if (!result) {
    throw new Error('Lead not found');
  }

  if (result) {
    await LeadsModel.findOneAndUpdate(
      { customerName: result.customerName },
      { $pull: { employeeEmails: email } },
      { new: true },
    );

    // Notify the removed employee
    await NotificationService.createNotification(
      `You were removed from lead: ${result.customerName}`,
      email,
      {
        type: 'lead_removal',
        leadId: result._id,
        customerName: result.customerName,
        removedBy: removedBy || 'System',
      },
    );

    // Notify the person who made the removal (if provided)
    if (removedBy && removedBy !== email) {
      await NotificationService.createNotification(
        `You removed ${email} from lead ${result.customerName}`,
        removedBy,
        {
          type: 'lead_removal_made',
          leadId: result._id,
          customerName: result.customerName,
          removedUser: email,
        },
      );
    }
  }

  return result;
};
