import { NextResponse } from "next/server";
import { Blog } from "../../lib/models";
import { connectDb1 } from "@/app/lib/utils";

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        await connectDb1();
        const data = await Blog.find(); 
        return NextResponse.json(data);
    } catch (err) {
        console.log(err);
        return NextResponse.json({error:"Failed to fetch posts!"});
  }
};