import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  itemsPrice: { type: Number },
  shippingPrice: { type: Number },
  taxPrice: { type: Number },
  totalPrice: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //   isPaid: { type: Boolean, default: false },
  //   paidAt: { type: Date },
  //   isDelivered: { type: Boolean, default: false },
  //   deliveredAt: { type: Date },
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
