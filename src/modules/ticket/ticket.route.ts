import { Router } from 'express';
import {
  getAllTicketsController,
  getTicketByAssignedToController,
  updateTicketByIdController,
} from './ticket.controller';

export const ticketRoutes = Router();

ticketRoutes.get('/', getAllTicketsController);
ticketRoutes.get('/user', getTicketByAssignedToController);
ticketRoutes.patch('/:id', updateTicketByIdController);
