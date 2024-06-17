import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Blog } from "../../../../lib/models";

// Define a flag variable to force dynamic serving
export const dynamic = 'force-dynamic';

async function connectDb() {
    if (mongoose.connection.readyState) return;
    await mongoose.connect(process.env.DATABASE_URL1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

export async function GET(request, { params }) {
    const {author} = params;
    await connectDb();
    const data = await Blog.find({ author }); 

    return NextResponse.json({ result: data });
}

