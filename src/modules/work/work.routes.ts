import express from 'express';

import { auth } from '../../middlewares/auth';
import { upload } from '../../app/multer.config';
import { createWorkEntry, getAllWorkEntries, getPipelineData } from './work.controller';

const workRoutes = express.Router();


workRoutes.post(
  '/',
  auth('Employee'),
  upload.array('files'),
  createWorkEntry
);


workRoutes.get('/', auth('Employee','Admin'), getAllWorkEntries);
workRoutes.get('/pipeline', auth('Employee'), getPipelineData);

export default workRoutes;
