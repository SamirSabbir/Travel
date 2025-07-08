import { model, Schema } from 'mongoose';
import TBlog from './blog.interface';

const BlogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const BlogModel = model<TBlog>('Blog', BlogSchema);


export default BlogModel