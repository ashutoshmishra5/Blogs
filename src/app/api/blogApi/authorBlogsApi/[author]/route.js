import { NextResponse } from "next/server";
import { Blog } from "../../../../lib/models";
import { connectDb } from "@/app/lib/utils";


export const GET = async (request, { params }) => {
    try {
        const {author} = params;
        await connectDb();
        const data = await Blog.find({ author }); 
        return NextResponse.json(data);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
  }
};
