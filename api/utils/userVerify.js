import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";

export const VerifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(ErrorHandler(401, "Unauthorized user"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(ErrorHandler(401, "Unauthorized"));
    }

    req.User = user;
    next();
  });
};
