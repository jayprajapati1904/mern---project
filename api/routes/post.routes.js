import express from "express";
import { VerifyToken } from "../utils/userVerify.js";
import {
  create,
  getpost,
  deletepost,
  updatepost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", VerifyToken, create);
router.get("/getpost", VerifyToken, getpost);
router.delete("/deletepost/:postId/:userId", VerifyToken, deletepost);
router.put("/updatepost/:postId/:userId", VerifyToken, updatepost);

export default router;
