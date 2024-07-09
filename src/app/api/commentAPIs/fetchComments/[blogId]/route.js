import { NextResponse } from "next/server";
import { connectDb } from "@/app/lib/utils";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try{
        const { blogId } = params;
        const { CommentModel } = await connectDb();
        const data = await CommentModel.find({ blogId });
        return NextResponse.json(data);
    } catch(error) {
        console.log(JSON.stringify(error));
        return NextResponse.json({ error:"Failed to fetch Comments"});
    }
};
