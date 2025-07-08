import TBlog from './blog.interface';
import BlogModel from './blog.model';

export const createBlogInDB = async (blog: TBlog) => {
  const result = await BlogModel.create(blog);
  return result;
};

export const updateBlogInDB = async (id: string, updatedData: any) => {
  const result = await BlogModel.findByIdAndUpdate(id, updatedData);
  return result;
};

export const getAllBlogsFromDB = async () => {
  const result = await BlogModel.find();
  return result;
};

export const deleteBlogFromDB = async (blogId: string) => {
  const result = await BlogModel.findByIdAndDelete(blogId);
  return result;
};
