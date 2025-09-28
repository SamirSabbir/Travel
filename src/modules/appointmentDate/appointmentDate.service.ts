import { AppointmentDateModel } from './appointmentDate.model';
import { TAppointmentDate } from './appointmentDate.interface';
import { ActivityService } from '../activity/activity.service';

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
  userName: string,
  updateData: Partial<TAppointmentDate>,
) => {
  const result = await AppointmentDateModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
    { new: true },
  ).populate('workId');

  if (result) {
    await ActivityService.recordActivity({
      userEmail,
      userName,
      workId: result.workId?.toString(),
      action: 'Appointment Updated',
      message: `Updated Appointment details for work "${result.workId?.name}".`,
      meta: updateData,
    });
  }

  return result;
};
