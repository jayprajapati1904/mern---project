import express from "express";
import {
  test,
  UpdateUser,
  DeleteUser,
  signout,
  getUsers,
  getUser,
} from "../controllers/user.controller.js";
import { VerifyToken } from "../utils/userVerify.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", VerifyToken, UpdateUser);
router.delete("/delete/:userId", VerifyToken, DeleteUser);
router.post("/signout", signout);
router.get("/getusers", VerifyToken, getUsers);
router.get("/:userId", getUser);
export default router;
