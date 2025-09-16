import { Router } from 'express';
import {
  getAllHotelsController,
  getHotelByAssignedToController,
  updateHotelByIdController,
} from './hotel.controller';
import { auth } from '../../middlewares/auth';

export const hotelRoutes = Router();

hotelRoutes.get('/', getAllHotelsController);
hotelRoutes.get(
  '/user',
  auth('SuperAdmin', 'Employee'),
  getHotelByAssignedToController,
);
hotelRoutes.patch(
  '/:id',
  auth('SuperAdmin', 'Employee'),
  updateHotelByIdController,
);
