import express from 'express';
import userRoutes from '../modules/user/user.route';
import authRoutes from '../modules/auth/auth.route';
import leadRoutes from '../modules/leads/leads.route';
import salesRoutes from '../modules/sales/sales.routes';
import workRoutes from '../modules/work/work.routes';
import { visaRoutes } from '../modules/visa/visa.route';
import path from 'path';
import { invoiceRoutes } from '../modules/Invoice/invoice.route';
import { accountRoutes } from '../modules/Accounts/accounts.routes';
import chartRouter from '../modules/chart/chart.route';

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
    path: '/leads',
    route: leadRoutes,
  },
  {
    path: '/sales',
    route: salesRoutes,
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
    route: chartRouter
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
