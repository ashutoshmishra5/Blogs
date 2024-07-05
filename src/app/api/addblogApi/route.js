import { Blog } from '../../lib/models';
import { connectDb } from '../../lib/utils'
import { NextResponse } from "next/server";

//force page to load dynamically
export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  await connectDb();

  try {
    const {data} = await request.json();
    const { title, desc, date, author, imgUrl, category } = data;
    const post = await Blog.create({ title, desc, date, author, imgUrl, category });
    return NextResponse.json({data: "Post Submitted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit post" });
  }
};