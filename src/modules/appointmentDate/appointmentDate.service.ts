import { AppointmentDateModel } from './appointmentDate.model';
import { TAppointmentDate } from './appointmentDate.interface';

export const getAllAppointmentsFromDB = async () => {
  return await AppointmentDateModel.find();
};

export const getAppointmentByAssignedToFromDB = async (userEmail: string) => {
  return await AppointmentDateModel.find({ assignedTo: userEmail }).populate(
    'workId',
  );
};

export const updateAppointmentByIdInDB = async (
  id: string,
  userEmail: string,
  updateData: Partial<TAppointmentDate>,
) => {
  const result = await AppointmentDateModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
  ).populate('workId');
  return result;
};
