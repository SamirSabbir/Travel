import express from 'express';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from './blog.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const BlogRoutes = express.Router();

BlogRoutes.post('/', createBlog);
BlogRoutes.patch('/:id', updateBlog);
BlogRoutes.get('/', getAllBlogs);
BlogRoutes.delete('/:id', auth(USER_ROLE.admin), deleteBlog);

export default BlogRoutes;
