import mongoose from "mongoose";
import { Blog } from "../../lib/models";

const connectDb = async () => {
  if (mongoose.connection.readyState) return;
  await mongoose.connect(process.env.DATABASE_URL1, {
    useNewUrlParser: true,
    // Remove useUnifiedTopology option
  });
};

export async function GET(req, res) {
  await connectDb();
  try {
    const data = await Blog.find();
    res.setHeader("Cache-Control", "no-store, max-age=0");
    return res.status(200).json({ result: data });
  } catch (error) {
    return res.status(500).json({ result: false, error: "Error retrieving data" });
  }
}
