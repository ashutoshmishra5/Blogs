import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        date: { type: String, required: false },
        author: { type: String, required: false },
        imgUrl: { type: String, required: false },
        category: { type: String, required: false }
    }
);

const commentSchema = new mongoose.Schema(
    {
        blogId: {type: String, required: true},
        commentAuthor: {type: String, required: true},
        blogComment: {type: String, required: true},
        commentDate: {type: String, required: true}
    }
);
export const Comment = mongoose.models?.Comment || mongoose.model('Comment', commentSchema);
export const Blog = mongoose.models?.Blog || mongoose.model('Blog', blogSchema);
