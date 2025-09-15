import { Request, Response } from 'express';
import {
  getAllAppointmentsFromDB,
  getAppointmentByAssignedToFromDB,
  updateAppointmentByIdInDB,
} from './appointmentDate.service';

// Get all appointments (admin/general)
export const getAllAppointmentsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const appointments = await getAllAppointmentsFromDB();
    res.json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch appointments', error: err });
  }
};

// Get appointment by assignedTo (user-specific)
export const getAppointmentByAssignedToController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userEmail = req?.user.userEmail;
    const appointment = await getAppointmentByAssignedToFromDB(userEmail);
    res.json(appointment);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch appointment', error: err });
  }
};

// Update appointment by ID and assignedTo
export const updateAppointmentByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.userEmail; // assuming client sends userEmail in body
    const updateData = req.body;

    const updatedAppointment = await updateAppointmentByIdInDB(
      id,
      userEmail,
      updateData,
    );
    res.json(updatedAppointment);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to update appointment', error: err });
  }
};
