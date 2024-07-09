// app/api/blogs/route.js
import { connectDb } from '@/app/lib/utils';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const { BlogModel } = await connectDb();
    const blogs = await BlogModel.find();
    return NextResponse.json(blogs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch blogs!' });
  }
};
