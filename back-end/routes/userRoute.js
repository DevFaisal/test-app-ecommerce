import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const router = Router();

router.get("/user", authMiddleware, async (req, res) => {
  const user = req.user;
  try {
    const userFound = await userModel.findOne({ email: user.email });
    if (userFound) {
      return res.status(200).json({
        _id: userFound._id,
        email: userFound.email,
        name: userFound.name,
      });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const sign = jwt.sign(
      {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
      config.secret
    );
    const token = `Bearer ${sign}`;
    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        const sign = jwt.sign(
          {
            name: user.name,
            email: user.email,
            _id: user._id,
          },
          config.secret
        );
        const token = `Bearer ${sign}`;
        return res.status(200).json({ user, token });
      }
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/logout", authMiddleware, (req, res) => {
  return res.status(200).json({ message: "Logout successful", logout: true });
});

router.get("/me", authMiddleware, async (req, res) => {
  const user = req.user;
  try {
    const userFound = await userModel.findOne({ email: user.email });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({
        _id: userFound._id,
        email: userFound.email,
        name: userFound.name,
        isAdmin: userFound.isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
