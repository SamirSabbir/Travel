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
import { notificationRoutes } from '../modules/notifications/notifications.routes';
import { ticketRoutes } from '../modules/ticket/ticket.route';
import { transferRoutes } from '../modules/transfer/transfer.route';
import { hotelRoutes } from '../modules/hotel/hotel.route';
import { tourPackageRoutes } from '../modules/tourPackage/tourPackage.route';
import { nocRoutes } from '../modules/NOC/noc.route';
import { specialRequestRoutes } from '../modules/specialRequest/specialRequest.route';
import { salaryCertificateRoutes } from '../modules/salaryCertificate/salaryCertificate.route';
import { appointmentDateRoutes } from '../modules/appointmentDate/appointmentDate.route';
import { ExpenseRoutes } from '../modules/expense/expense.route';
import { notaryRoutes } from '../modules/notary/notary.route';

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
    path: '/ticket',
    route: ticketRoutes,
  },
  {
    path: '/transfer',
    route: transferRoutes,
  },
  {
    path: '/hotel',
    route: hotelRoutes,
  },
  {
    path: '/appointmentDate',
    route: appointmentDateRoutes,
  },
  {
    path: '/tourPackage',
    route: tourPackageRoutes,
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
  {
    path: '/notifications',
    route: notificationRoutes,
  },
  {
    path: '/noc',
    route: nocRoutes,
  },
  {
    path: '/notary',
    route: notaryRoutes,
  },
  {
    path: '/specialRequest',
    route: specialRequestRoutes,
  },
  {
    path: '/salaryCertificate',
    route: salaryCertificateRoutes,
  },
  {
    path: '/expense',
    route: ExpenseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
