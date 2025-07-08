import BlogRoutes from '../modules/blog/blog.route';
import express from 'express';
import userRoutes from '../modules/user/user.route';
import authRoutes from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  // {
  //   path: '/blogs',
  //   route: BlogRoutes,
  // },
  // {
  //   path: '/users',
  //   route: userRoutes,
  // },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
