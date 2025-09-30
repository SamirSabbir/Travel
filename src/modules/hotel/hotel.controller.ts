import { Request, Response } from 'express';
import {
  getAllHotelsFromDB,
  getHotelByAssignedToFromDB,
  updateHotelByIdInDB,
} from './hotel.service';

export const getAllHotelsController = async (_req: any, res: Response) => {
  try {
    const hotels = await getAllHotelsFromDB();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hotels', error: err });
  }
};

export const getHotelByAssignedToController = async (
  req: any,
  res: Response,
) => {
  try {
    const userEmail = req.user.userEmail;
    const hotel = await getHotelByAssignedToFromDB(userEmail);
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hotel', error: err });
  }
};

export const updateHotelByIdController = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userEmail = req?.user?.userEmail;
    const updateData = req.body;

    const updatedHotel = await updateHotelByIdInDB(
      id,
      userEmail,
      req?.user?.userName,
      updateData,
    );
    res.json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update hotel', error: err });
  }
};
