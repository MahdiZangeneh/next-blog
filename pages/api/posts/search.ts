import { NextApiHandler } from "next";
import dbConnect from "../../../lib/dbConnect";
import { formatPosts, isAdmin } from "../../../lib/utils";
import Post from "../../../models/Post";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") return res.status(404).send("Not Found");

  const admin = await isAdmin(req, res);
  if (!admin) return res.status(403).json({ error: "Unauthorized access!" });

  const title = req.query.title as string;
  if (!title.trim())
    return res.status(400).json({ error: "Invalid search query!" });

  await dbConnect();
  const post = await Post.find({ title: { $regex: title, $options: "i" } });

  res.json({ results: formatPosts(post) });
};

export default handler;
