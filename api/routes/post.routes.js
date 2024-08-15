import express from "express";
import { VerifyToken } from "../utils/userVerify.js";
import { create, getpost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", VerifyToken, create);
router.get("/getpost", VerifyToken, getpost);

export default router;
