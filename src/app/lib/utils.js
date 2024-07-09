// lib/utils.js
import mongoose from 'mongoose';
import { blogSchema, commentSchema } from './models';

let blogDb, commentDb, BlogModel, CommentModel;

export const connectDb = async () => {
  if (!blogDb) {
    blogDb = mongoose.createConnection(process.env.DATABASE_URL1, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  }

  if (!commentDb) {
    commentDb = mongoose.createConnection(process.env.DATABASE_URL2, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  }

  if (!BlogModel) {
    BlogModel = blogDb.model('Blog', blogSchema);
  }

  if (!CommentModel) {
    CommentModel = commentDb.model('Comment', commentSchema);
  }

  return { BlogModel, CommentModel };
};
