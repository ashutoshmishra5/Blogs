import mongoose from "mongoose";
import { Blog } from "../../lib/models";

const connectDb = async () => {
  if (mongoose.connection.readyState) return;
  await mongoose.connect(process.env.DATABASE_URL1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export async function GET() {
  await connectDb();
  try {
    const data = await Blog.find();
    return new Response(JSON.stringify({ result: data }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ result: false, error: "Error retrieving data" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
