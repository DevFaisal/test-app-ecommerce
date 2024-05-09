import productModel from "../models/productModel.js";
import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    const products = await productModel.find();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel({ _id: id });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add-product", isAdmin, async (req, res) => {
  const { name, price, description, countInStock } = req.body;

  try {
    const product = await productModel.create({
      name,
      price,
      description,
      countInStock,
    });
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/product/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, price, description, countInStock } = req.body;

  try {
    const product = await productModel.findOneAndUpdate(
      { _id: id },
      { name, price, description, countInStock },
      { new: true }
    );
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/product/:id", isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findOneAndDelete({ _id: id });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
