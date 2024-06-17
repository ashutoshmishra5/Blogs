import mongoose from 'mongoose';
import { Blog } from '../../../../lib/models';
import { NextResponse } from 'next/server';

// Define a flag variable to force dynamic serving
export const dynamic = 'force-dynamic';

async function connectDb() {
    if (mongoose.connection.readyState) return;
    await mongoose.connect(process.env.DATABASE_URL1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

export async function PUT(request, { params }) {
    const { id } = params;
  
    await connectDb();
    const { title, desc, date, author } = await request.json();

    const updatedPost = await Blog.findByIdAndUpdate(id, { title, desc, date, author });

      if (updatedPost) {
        return NextResponse.json({ message: "Blog post updated successfully", result: updatedPost });
      } else {
        return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
      }
    
  }
  