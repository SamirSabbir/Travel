import { Request, Response } from 'express';
import { ActivityService } from './activity.service';

// create activity (can be called by client to push activity)
export const recordActivityController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const doc = await ActivityService.recordActivity(payload);
    res.status(201).json({ success: true, data: doc });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getActivitiesController = async (req: Request, res: Response) => {
  try {
    const { page, limit, userEmail, from, to } = req.query;
    const result = await ActivityService.getActivities({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      userEmail: userEmail ? String(userEmail) : undefined,
      from: from ? String(from) : undefined,
      to: to ? String(to) : undefined,
    });
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOnlineUsersController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const users = await ActivityService.getOnlineUsers();
    res.json({ success: true, data: users });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getStatsController = async (_req: Request, res: Response) => {
  try {
    const stats = await ActivityService.getStats();
    res.json({ success: true, data: stats });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
