import { TicketModel } from './ticket.model';
import { TTicket } from './ticket.interface';
import { ActivityService } from '../activity/activity.service';

export const getAllTicketsFromDB = async () => {
  return await TicketModel.find();
};

export const getTicketByAssignedToFromDB = async (userEmail: string) => {
  return await TicketModel.findOne({ assignedTo: userEmail }).populate(
    'workId',
  );
};

export const updateTicketByIdInDB = async (
  id: string,
  userEmail: string,
  userName: string,
  updateData: Partial<TTicket>,
) => {
  const result = await TicketModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
    { new: true },
  ).populate('workId');

  if (result) {
    await ActivityService.recordActivity({
      userEmail,
      userName,
      workId: updateData.workId as any,
      action: 'Ticket Updated',
      message: `Updated Ticket details for work "${result?.workId}".`,
      meta: updateData,
    });
  }

  return result;
};
