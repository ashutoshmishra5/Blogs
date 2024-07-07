import { Comment } from '@/app/lib/models';
import { connectDb2 } from '@/app/lib/utils';
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  await connectDb2();

  try {
    const {data} =await request.json();
    const { blogId, commentAuthor, blogComment, commentDate } = data;
    console.log("......................................");
    console.log(data);
    const Response = await Comment.create({ blogId, commentAuthor, blogComment, commentDate });
    return NextResponse.json({ data: "Comment Submitted" });
  } catch(error) {
    return NextResponse.json({ error: "Failed to submit comment"});
  }
};