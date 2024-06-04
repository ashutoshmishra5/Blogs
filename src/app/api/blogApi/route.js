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

export async function GET(req, res) {
  await connectDb();
  try {
    const data = await Blog.find();
    // Use res.json instead of NextResponse.json
    return res.status(200).json({ result: data });
  } catch (error) {
    console.error("Error retrieving data:", error);
    // Use res.json instead of NextResponse.json
    return res.status(500).json({ result: false, error: "Error retrieving data" });
  }
}
