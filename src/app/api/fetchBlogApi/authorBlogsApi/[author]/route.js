import { NextResponse } from "next/server";
import { connectDb } from '@/app/lib/utils';

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        const {author} = params;
        const { BlogModel } = await connectDb();
        const data = await BlogModel.find({ author }); 
        return NextResponse.json(data);
    } catch (err) {
        console.log(err);
        return NextResponse.json({error:"Failed to fetch posts!"});
  }
};
