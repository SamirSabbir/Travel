import express from 'express';
import { loginUser } from './auth.controller';

const authRoutes = express.Router();

authRoutes.post('/login', loginUser);

export default authRoutes;
