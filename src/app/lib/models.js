import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    date: { type: String, required: false },
    author: { type: String, required: false }
}
);

export const Blog = mongoose.models?.Blog || mongoose.model('Blog', blogSchema);