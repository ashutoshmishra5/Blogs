import { NextResponse } from "next/server";
import { connectDb } from "@/app/lib/utils";
import { Blog } from "@/app/lib/models";

export const GET = async() => {
    try{
        await connectDb();
        const data = await Blog.find();
        return NextResponse.json(data);
    }catch(err){
        console.log(err);
        return {error: "Something went wrong!"};
    }
};