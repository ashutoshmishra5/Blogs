import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    desc: { type: String, required: true },
}
);

export const Blog = mongoose.models?.Blog || mongoose.model('Blog', blogSchema);