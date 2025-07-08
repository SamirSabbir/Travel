import { Request, Response } from 'express';
import {
  createBlogInDB,
  getAllBlogsFromDB,
  deleteBlogFromDB,
  updateBlogInDB,
} from './blog.service';

export const createBlog = async (req: Request, res: Response) => {
  const blogData = req.body;
  try {
    const result = await createBlogInDB(blogData);

    res.status(201).send({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: result,
    });
  } catch (err) {
    return {
      message: '',
      status: 400,
      err,
    };
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const result = await getAllBlogsFromDB();

    res.status(201).send({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: result,
    });
  } catch (err) {
    return {
      message: '',
      status: 400,
      err,
    };
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteBlogFromDB(id);

    res.status(201).send({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 201,
      data: result,
    });
  } catch (err) {
    return {
      message: '',
      status: 400,
      err,
    };
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateBlogData = req.body;
    const result = await updateBlogInDB(id, updateBlogData);

    res.status(201).send({
      success: true,
      message: 'Blog updated successfully',
      statusCode: 201,
      data: result,
    });
  } catch (err) {
    return {
      message: '',
      status: 400,
      err,
    };
  }
};
