import express from "express";
import { VerifyToken } from "../utils/userVerify.js";
import { createComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", VerifyToken, createComment);

export default router;
