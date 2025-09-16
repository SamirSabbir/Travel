import { Router } from 'express';
import {
  getAllHotelsController,
  getHotelByAssignedToController,
  updateHotelByIdController,
} from './hotel.controller';

export const hotelRoutes = Router();

hotelRoutes.get('/', getAllHotelsController);
hotelRoutes.get('/user', getHotelByAssignedToController);
hotelRoutes.patch('/:id', updateHotelByIdController);
