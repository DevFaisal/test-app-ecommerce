import express from "express";
import cors from "cors";
import router from "../routes/userRoute.js";
import { connect } from "../db/connection.js";
import ProductRouter from "../routes/productRoute.js";
import cartRouter from "../routes/cartRoute.js";
import productModel from "../models/productModel.js";
import cartModel from "../models/CartMode.js";
import userModel from "../models/userModel.js";
import demoData from "../demoData.json" with { "type": "json" };
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api/users", router);
app.use("/api/products", ProductRouter);
app.use("/api/cart", cartRouter);

app.post("/deleteDB", (req, res) => {
  productModel.deleteMany({}).then(() => {
    res.status(200).json({ message: "Database deleted" });
  });
});

app.post("/demo", (req, res) => {
  try {
    productModel.insertMany(demoData.products).then(() => {
      console.log("Data inserted");
    });
    // const demoUsersPasswordHashed = demoData.users.map((user) => { 
    //   return {
    //     ...user,
    //     password: bcrypt.hashSync(user.password, 10),
    //   };
    // });
    // console.log(demoUsersPasswordHashed);
    // userModel.insertMany(demoUsersPasswordHashed).then(() => {
    //   console.log("Data inserted");
    // });
    res.status(200).json({ message: "Demo data inserted" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect()
    // .then(async () => { 
  //   if( await userModel.find({}).length === 0){
  //   fetch("http://localhost:3000/demo", {
  //     method: "POST",
  //   });
  // }
  // });
  
});

