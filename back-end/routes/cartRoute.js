import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import cartModel from "../models/CartMode.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, async (req, res) => {
  const { _id } = req.user;
  console.log(req.body);
  const { productId, quantity } = req.body;

  try {
    const product = await productModel.findById({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingCart = await cartModel.findOne({
      user: _id,
    });

    if (existingCart) {
      const existingCartItems = await cartModel.findOne({
        user: _id,
        "cartItems.product": productId,
      });
      if (!existingCartItems) {
        await existingCart.updateOne({
          $push: {
            cartItems: {
              name: product.name,
              quantity,
              price: product.price * quantity,
              product: product._id,
            },
          },
        });
        return res.status(200).json({ message: "Product added to cart" });
      } else {
        await cartModel.findOneAndUpdate(
          {
            user: _id,
            "cartItems.product": productId,
          },
          {
            $set: {
              "cartItems.$.quantity": quantity,
              "cartItems.$.price": product.price * quantity,
            },
          }
        );
      }
      return res.status(200).json({ message: "Product added to cart" });
    } else {
      const cart = new cartModel({
        cartItems: [
          {
            name: product.name,
            quantity,
            price: product.price * quantity,
            product: product._id,
          },
        ],
        user: _id,
      });
      await cart.save();
      return res.status(200).json({ message: "Product added to cart" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

cartRouter.get("/get/all", authMiddleware, async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await cartModel.findOne({ user: _id }).populate({
      path: "cartItems.product",
      select: "name price",
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const { cartItems } = cart;
    return res.status(200).json({ cartItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

cartRouter.delete("/delete/:id", authMiddleware, async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  try {
    const cartId = await userModel.findById({ _id }).select("cart");
    const newID = cartId._id.toHexString();

    const cart = await cartModel.findOne({ user: newID });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const existingCartItem = await cartModel.findOne({
      user: _id,
      "cartItems._id": id,
    });
    if (!existingCartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    await cartModel.findOneAndUpdate(
      { user: _id },
      { $pull: { cartItems: { _id: id } } }
    );
    return res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default cartRouter;
