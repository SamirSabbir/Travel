import { Request, Response } from 'express';
import {
  getAllTicketsFromDB,
  getTicketByAssignedToFromDB,
  updateTicketByIdInDB,
} from './ticket.service';

export const getAllTicketsController = async (_req: any, res: Response) => {
  try {
    const tickets = await getAllTicketsFromDB();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tickets', error: err });
  }
};

export const getTicketByAssignedToController = async (
  req: any,
  res: Response,
) => {
  try {
    const userEmail = req.user.userEmail;
    const ticket = await getTicketByAssignedToFromDB(userEmail);
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch ticket', error: err });
  }
};

export const updateTicketByIdController = async (
  req: any,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userEmail = req?.user?.userEmail;
    const updateData = req.body;

    const updatedTicket = await updateTicketByIdInDB(
      id,
      userEmail,
      req?.user?.userName,
      updateData,
    );
    res.json(updatedTicket);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update ticket', error: err });
  }
};
