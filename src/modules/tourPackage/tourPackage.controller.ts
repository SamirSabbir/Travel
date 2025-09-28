import { Request, Response } from 'express';
import {
  getAllTourPackagesFromDB,
  getTourPackageByAssignedToFromDB,
  updateTourPackageByIdInDB,
} from './tourPackage.service';

export const getAllTourPackagesController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const tours = await getAllTourPackagesFromDB();
    res.json(tours);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch tour packages', error: err });
  }
};

export const getTourPackageByAssignedToController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userEmail = req.user.userEmail;
    const tour = await getTourPackageByAssignedToFromDB(userEmail);
    res.json(tour);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch tour package', error: err });
  }
};

export const updateTourPackageByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.userEmail;
    const updateData = req.body;

    const updatedTour = await updateTourPackageByIdInDB(
      id,
      userEmail,
      req?.user?.userName,
      updateData,
    );
    res.json(updatedTour);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to update tour package', error: err });
  }
};
