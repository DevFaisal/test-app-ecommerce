import express from "express";
import cors from "cors";
import router from "../routes/userRoute.js";
import { connect } from "../db/connection.js";
import ProductRouter from "../routes/productRoute.js";
import cartRouter from "../routes/cartRoute.js";
import productModel from "../models/productModel.js";
import cartModel from "../models/CartMode.js";
import userModel from "../models/userModel.js";
import demoData from "../demoData.json" with { "type": "json" };;

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

console.log(demoData.products);
app.post("/demo", (req, res) => {
  try {
    productModel.insertMany(demoData.products).then(() => {
      console.log("Data inserted");
    });
    userModel.insertMany(demoData.users).then(() => {
      console.log("Data inserted");
    });
    res.send("Data inserted");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  
  console.log(`Server is running on port ${port}`);
  connect().then(async () => {
    console.log("Database connected");
    if ((await userModel.find()).length === 0) {
      await userModel.insertMany(demoData.users).then(() => {
        console.log("Data inserted");
      });
      productModel.insertMany(demoData.products).then(() => {
        console.log("Data inserted");
      });
    }
    return;
  })
    .catch((error) => {
      console.log("Database not connected");
      console.log(error);
     });
});

