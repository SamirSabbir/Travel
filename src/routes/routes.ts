import express from 'express';
import userRoutes from '../modules/user/user.route';
import authRoutes from '../modules/auth/auth.route';
import leadRoutes from '../modules/leadsManage/leads.route';
import salesRoutes from '../modules/leads/leads.routes';
import workRoutes from '../modules/work/work.routes';
import { visaRoutes } from '../modules/visa/visa.route';
import path from 'path';
import { invoiceRoutes } from '../modules/Invoice/invoice.route';
import { accountRoutes } from '../modules/Accounts/accounts.routes';
import chartRouter from '../modules/chart/chart.route';
import { workRecordRoutes } from '../modules/workRecords/workRecord.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import leadsManageRoutes from '../modules/leadsManage/leads.route';
import LeadsRoutes from '../modules/leads/leads.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/leads-manage',
    route: leadsManageRoutes,
  },
  {
    path: '/leads',
    route: LeadsRoutes,
  },
  {
    path: '/works',
    route: workRoutes,
  },
  {
    path: '/visa',
    route: visaRoutes,
  },
  {
    path: '/invoice',
    route: invoiceRoutes,
  },
  {
    path: '/account',
    route: accountRoutes,
  },
  {
    path: '/chart',
    route: chartRouter,
  },
  {
    path: '/work-records',
    route: workRecordRoutes,
  },
  {
    path: '/payment-details',
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
