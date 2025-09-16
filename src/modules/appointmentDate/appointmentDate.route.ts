import { Router } from 'express';
import {
  getAllAppointmentsController,
  getAppointmentByAssignedToController,
  updateAppointmentByIdController,
} from './appointmentDate.controller';
import { auth } from '../../middlewares/auth';

export const appointmentDateRoutes = Router();

// Get all appointments (admin/general)
appointmentDateRoutes.get(
  '/',
  auth('SuperAdmin'),
  getAllAppointmentsController,
);

// Get appointment by assigned user
appointmentDateRoutes.get(
  '/user',
  auth('SuperAdmin', 'Employee'),
  getAppointmentByAssignedToController,
);

// Update appointment by ID (restricted to assigned user)
appointmentDateRoutes.patch(
  '/:id',
  auth('SuperAdmin', 'Employee'),
  updateAppointmentByIdController,
);
