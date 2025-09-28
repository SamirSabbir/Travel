import { VisaModel } from './visa.model';
import { TVisa } from './visa.interface';
import { ActivityService } from '../activity/activity.service';

export const getAllVisasFromDB = async () => {
  return await VisaModel.find();
};

export const getVisaByAssignedToFromDB = async (userEmail: string) => {
  return await VisaModel.findOne({ assignedTo: userEmail }).populate('workId');
};

export const updateVisaByIdInDB = async (
  id: string,
  userEmail: string,
  updateData: Partial<TVisa>,
) => {
  const result = await VisaModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
  ).populate('workId');
  return result;
};

export const updateVisaCustomerDetailsByIdInDB = async ( 
  id: string,
  userEmail: string,
  userName: string,
  updateData: Partial<TVisa>,
) => {
  const result = await VisaModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail, isSubmitted: false },
    { ...updateData, isSubmitted: true },
    { new: true }
  ).populate('workId');

  if (result) {
    await ActivityService.recordActivity({
      userEmail,
      userName,
      workId: result.workId?._id.toString(),
      action: 'Visa Updated',
      message: `Updated Visa details for work "${result.workId?.name}".`,
      meta: updateData,
    });
  }

  return result;
};
