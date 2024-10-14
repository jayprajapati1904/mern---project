import express from "express";
import { VerifyToken } from "../utils/userVerify.js";
import {
  createComment,
  getPostComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", VerifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
export default router;
