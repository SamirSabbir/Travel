import express from 'express';

import { auth } from '../../middlewares/auth';
import { upload } from '../../app/multer.config';
import { createWorkEntry, getAllWorkEntries } from './work.controller';

const workRoutes = express.Router();

// Work employee uploads files and sets status
workRoutes.post(
  '/',
  auth('Employee'),
  upload.array('files'),
  createWorkEntry
);

// Get all work entries (for pipeline view or others)
workRoutes.get('/', auth('Employee'), getAllWorkEntries);

export default workRoutes;
