import { Router } from 'express';
import {
  recordActivityController,
  getActivitiesController,
  getOnlineUsersController,
  getStatsController,
} from './activity.controller';
import { auth } from '../../middlewares/auth';

export const activityRoutes = Router();

// Record activity (could be used by client or server)
activityRoutes.post(
  '/',
  auth('Employee', 'SuperAdmin', 'AccountAdmin'),
  recordActivityController,
);

// Paginated activities (admins/employees)
activityRoutes.get(
  '/',
  auth('Employee', 'SuperAdmin', 'AccountAdmin'),
  getActivitiesController,
);

// Online users list
activityRoutes.get(
  '/online',
  auth('Employee', 'SuperAdmin', 'AccountAdmin'),
  getOnlineUsersController,
);

// Stats (total online, completed works)
activityRoutes.get(
  '/stats',
  auth('Employee', 'SuperAdmin', 'AccountAdmin'),
  getStatsController,
);
