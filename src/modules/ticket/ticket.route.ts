import { Router } from 'express';
import {
  getAllTicketsController,
  getTicketByAssignedToController,
  updateTicketByIdController,
} from './ticket.controller';
import { auth } from '../../middlewares/auth';

export const ticketRoutes = Router();

ticketRoutes.get('/', auth('SuperAdmin'), getAllTicketsController);
ticketRoutes.get(
  '/user',
  auth('SuperAdmin', 'Employee'),
  getTicketByAssignedToController,
);
ticketRoutes.patch(
  '/:id',
  auth('SuperAdmin', 'Employee'),
  updateTicketByIdController,
);
