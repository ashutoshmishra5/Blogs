import { NextResponse } from "next/server";
import { connectDb1 } from "@/app/lib/utils";
import { Blog } from "@/app/lib/models";

export const dynamic = 'force-dynamic';

export const DELETE = async (request, { params }) => {

    try{
        const { id } = params;
        await connectDb1();
        const result = await Blog.findByIdAndDelete(id);
        return NextResponse.json(result);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Something went wrong!" });
    }
};