import { HotelModel } from './hotel.model';
import { THotel } from './hotel.interface';

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
  updateData: Partial<THotel>,
) => {
  const result = await HotelModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
  ).populate('workId');
  return result;
};
