import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { ErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !username === "" ||
    !email === "" ||
    !password === ""
  ) {
    next(ErrorHandler(400, "all fields required"));
  }

  const hashpassword = bcryptjs.hashSync(password, 10);

  const user = new User({
    username,
    email,
    password: hashpassword,
  });

  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    next(e);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(ErrorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(ErrorHandler(404, "User not found"));
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return next(ErrorHandler(401, "Incorrect password"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    // Destructure the password out of the user object and keep the rest
    const { password: pwd, ...userWithoutPassword } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, photoURL } = req.body;
  // console.log(name, email, photoURL);

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET_KEY
      );
      const { password, ...userWithoutPassword } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(userWithoutPassword);
    } else {
      const generatepassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashpassword = bcryptjs.hashSync(generatepassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashpassword,
        profilePicture: photoURL,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
          isAdmin: newUser.isAdmin,
        },
        process.env.JWT_SECRET_KEY
      );
      const { password, ...userWithoutPassword } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(userWithoutPassword);
    }
  } catch (error) {
    next(error);
  }
};

