// src/app/api/addblogApi/route.js
import mongoose from 'mongoose';
import { Blog } from '../../lib/models';

const connectDb = async () => {
  if (mongoose.connection.readyState) return;
  await mongoose.connect(process.env.DATABASE_URL1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const POST = async (req, res) => {
  await connectDb();

  try {
    const { title, desc } = await req.json();
    const post = await Blog.create({ title, desc });
    return new Response(JSON.stringify({ success: true, data: post }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
};
