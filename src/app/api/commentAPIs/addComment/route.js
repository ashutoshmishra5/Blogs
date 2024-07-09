import { connectDb } from '@/app/lib/utils';
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const POST = async (request) => {

  try {
    const {data} =await request.json();
    const { blogId, commentAuthor, blogComment, commentDate } = data;
    const { CommentModel } = await connectDb();
    const Response = await CommentModel.create({ blogId, commentAuthor, blogComment, commentDate });
    return NextResponse.json({ data: "Comment Submitted" });
  } catch(error) {
    return NextResponse.json({ error: "Failed to submit comment"});
  }
};