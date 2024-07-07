import { NextResponse } from "next/server";
import { Comment } from "../../../../lib/models";
import { connectDb2 } from "@/app/lib/utils";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try{
        const { blogId } = params;
        await connectDb2();
        const data = await Comment.find({ blogId });
        return NextResponse.json(data);
    } catch(error) {
        console.log(error);
        return NextResponse.json({ error:"Failed to fetch Comments"});
    }
};
