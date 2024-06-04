import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Blog } from "../../lib/models";

async function connectDb() {
    if (mongoose.connection.readyState) return;
    await mongoose.connect(process.env.DATABASE_URL1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

export async function GET() {
    try {
      await connectDb();
      const data = await Blog.find();
      console.log(data);
      return NextResponse.json({ result: data });
    } catch (error) {
      console.error("Error retrieving data:", error);
      return NextResponse.json({ result: false, error: "Error retrieving data" });
    }
  }
  
