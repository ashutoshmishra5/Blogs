import mongoose from "mongoose";
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
    return new Response(JSON.stringify({ result: data }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return new Response(JSON.stringify({ result: false, error: "Error retrieving data" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
