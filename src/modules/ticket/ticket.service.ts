import { TicketModel } from './ticket.model';
import { TTicket } from './ticket.interface';

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
  updateData: Partial<TTicket>,
) => {
  const result = await TicketModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
  ).populate('workId');
  return result;
};
