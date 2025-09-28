import { TourPackageModel } from './tourPackage.model';
import { TTourPackage } from './tourPackage.interface';
import { ActivityService } from '../activity/activity.service';

export const getAllTourPackagesFromDB = async () => {
  return await TourPackageModel.find();
};

export const getTourPackageByAssignedToFromDB = async (userEmail: string) => {
  return await TourPackageModel.find({ assignedTo: userEmail }).populate(
    'workId',
  );
};

export const updateTourPackageByIdInDB = async (
  id: string,
  userEmail: string,
  userName: string,
  updateData: Partial<TTourPackage>,
) => {
  const result = await TourPackageModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
    { new: true },
  ).populate('workId');

  if (result) {
    await ActivityService.recordActivity({
      userEmail,
      userName,
      workId: result?.workId?.toString(),
      action: 'Tour Package Updated',
      message: `Updated Tour Package details for work "${result?.workId?.name}".`,
      meta: updateData,
    });
  }

  return result;
};
