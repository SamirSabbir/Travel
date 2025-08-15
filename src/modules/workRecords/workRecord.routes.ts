import { auth } from '../../middlewares/auth';
import express from 'express';
import {
  handleGetWorkRecordsByAssignedId,
  handleGetWorkRecordsByWorkId,
} from './workRecord.controller';

const router = express.Router();

// router.get('/assigned/:assignedId', auth('SuperAdmin', 'HRAdmin'), handleGetWorkRecordsByAssignedId);
router.get(
  '/:workId',
  auth('SuperAdmin', 'HRAdmin', 'AccountAdmin'),
  handleGetWorkRecordsByWorkId,
);

export const workRecordRoutes = router;
