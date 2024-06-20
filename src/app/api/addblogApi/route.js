import mongoose from 'mongoose';
import { Blog } from '../../lib/models';
import { connectDb } from '../../lib/utils'
import { NextResponse } from "next/server";



export const POST = async (request) => {
  await connectDb();

  try {
    const { title, desc, date, author } = await request.json();
    const post = await Blog.create({ title, desc, date, author });
    return NextResponse.json(JSON.stringify({ success: true, data: "Post Submitted" }), { status: 201 });
  } catch (error) {
    return NextResponse.json(JSON.stringify({ success: false, data: "Error" }), { status: 400 });
  }
};
