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

export async function DELETE(request, { params }) {

        const { id } = params;
        await connectDb();
        const result = await Blog.findByIdAndDelete(id);

        if (result) {
            return NextResponse.json({ message: "Blog post deleted successfully", result });
        } else {
            return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
        }
}
