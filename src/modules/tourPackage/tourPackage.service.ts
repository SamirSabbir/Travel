import { TourPackageModel } from './tourPackage.model';
import { TTourPackage } from './tourPackage.interface';

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
  updateData: Partial<TTourPackage>,
) => {
  const result = await TourPackageModel.findOneAndUpdate(
    { _id: id, assignedTo: userEmail },
    updateData,
  ).populate('workId');
  return result;
};
