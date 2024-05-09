import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cartItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      // image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
