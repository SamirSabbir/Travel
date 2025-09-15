import { Router } from 'express';
import {
  getAllAppointmentsController,
  getAppointmentByAssignedToController,
  updateAppointmentByIdController,
} from './appointmentDate.controller';

export const appointmentDateRoutes = Router();

// Get all appointments (admin/general)
appointmentDateRoutes.get('/', getAllAppointmentsController);

// Get appointment by assigned user
appointmentDateRoutes.get('/user', getAppointmentByAssignedToController);

// Update appointment by ID (restricted to assigned user)
appointmentDateRoutes.patch('/:id', updateAppointmentByIdController);
