import { HotelModel } from './hotel.model';
import { THotel } from './hotel.interface';
import { ActivityService } from '../activity/activity.service';

export const getAllHotelsFromDB = async () => {
  return await HotelModel.find();
};

export const getHotelByAssignedToFromDB = async (userEmail: string) => {
  console.log(userEmail);
  return await HotelModel.find({ assignedTo: userEmail }).populate('workId');
};

export const updateHotelByIdInDB = async (
  id: string,
  userEmail: string,
  userName: string,
  updateData: Partial<THotel>,
) => {
  const result = await HotelModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
    { new: true },
  ).populate('workId');

  if (result) {
    await ActivityService.recordActivity({
      userEmail,
      userName,
      workId: updateData.workId as any,
      action: 'Hotel Updated',
      message: `Updated Hotel details for work "${result.workId?.name}", work id: ${result?.workId?._id}`,
      meta: updateData,
    });
  }

  return result;
};
