import express from "express";
import cors from "cors";
import router from "../routes/userRoute.js";
import { connect } from "../db/connection.js";
import ProductRouter from "../routes/productRoute.js";
import cartRouter from "../routes/cartRoute.js";
import productModel from "../models/productModel.js";
import cartModel from "../models/CartMode.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api/users", router);
app.use("/api/products", ProductRouter);
app.use("/api/cart", cartRouter);

// app.post("/deleteDB", (req, res) => {
//   cartModel.deleteMany({}).then(() => {
//     res.status(200).json({ message: "Database deleted" });
//   });
// });

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
