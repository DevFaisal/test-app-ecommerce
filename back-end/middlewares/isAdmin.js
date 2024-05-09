import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import userModel from "../models/userModel.js";

const isAdmin = express();

isAdmin.use((req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (authorization.startsWith("Bearer ")) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, config.secret, async (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        try {
          const id = user._id;
          const existingUser = await userModel.findOne({ _id: id });
          if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
          }
          if (existingUser.isAdmin === true) {
            req.user = user;
            next();
          } else {
            return res.status(403).json({ message: "Forbidden" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Internal server error" });
        }
      }
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

export default isAdmin;
