import express from "express";
import { VerifyToken } from "../utils/userVerify.js";
import { create, getpost, deletepost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", VerifyToken, create);
router.get("/getpost", VerifyToken, getpost);
router.delete("/deletepost/:postId/:userId", VerifyToken, deletepost);

export default router;
