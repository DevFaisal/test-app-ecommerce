import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const authMiddleware = express();

authMiddleware.use((req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: "Unauthorized" });
  if (authorization.startsWith("Bearer ")) {
    const token = authorization.split(" ")[1];

    jwt.verify(token, config.secret, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized token" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

export default authMiddleware;
