import Post from "../models/post.model.js";
import { ErrorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.User.isAdmin) {
    return next(ErrorHandler(403, "You are not allowed to create a post"));
  }

  if (!req.body.title || !req.body.content) {
    next(ErrorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.User.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
