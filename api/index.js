import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.json());
app.use(CookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});
