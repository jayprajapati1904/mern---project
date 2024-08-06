import express from "express";
import { test, UpdateUser } from "../controllers/user.controller.js";
import { VerifyToken } from "../utils/userVerify.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", VerifyToken, UpdateUser);

export default router;
