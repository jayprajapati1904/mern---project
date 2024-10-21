import express from "express";
import { VerifyToken } from "../utils/userVerify.js";
import {
  createComment,
  deleteComment,
  editComment,
  getcomments,
  getPostComments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", VerifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", VerifyToken, likeComment);
router.put("/editComment/:commentId", VerifyToken, editComment);
router.delete("/deleteComment/:commentId", VerifyToken, deleteComment);
router.get("/getcomments", VerifyToken, getcomments);

export default router;
