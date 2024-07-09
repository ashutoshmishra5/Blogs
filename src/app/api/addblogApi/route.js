import { connectDb } from '@/app/lib/utils';
import { NextResponse } from "next/server";

//force page to load dynamically
export const dynamic = 'force-dynamic';

export const POST = async (request) => {

  try {
    const {data} = await request.json();
    const { title, desc, date, author, imgUrl, category } = data;
    const { BlogModel } = await connectDb();
    const post = await BlogModel.create({ title, desc, date, author, imgUrl, category });
    return NextResponse.json({data: "Post Submitted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit post" });
  }
};

