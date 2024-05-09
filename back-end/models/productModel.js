import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  countInStock: {
    type: Number,
    required: [true, "Count in stock is required"],
  },
  //   imageUrl: {
  //     type: String,
  //     required: [true, "Image URL is required"],
  //   },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
