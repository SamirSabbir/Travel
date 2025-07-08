import express from 'express';
import { createUser, blockUser } from './user.controller';
import { auth } from '../../middlewares/auth';

const userRoutes = express.Router();

userRoutes.post('/register',  createUser);


export default userRoutes;
