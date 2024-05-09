import React, { useContext, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import UserContext from "../context/UserContext";
import { redirect, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

function Cart() {
  const [cart, setCart] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { user } = useContext<any>(UserContext);
  const naviagte = useNavigate();

  useEffect(() => {
    if (!user) {
      return naviagte("/login");
    }
    axios
      .get("http://localhost:3000/api/cart/get/all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.cartItems);
        setCart(res.data.cartItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <NavBar />

      <div className="flex flex-col gap-5 w-full">
        <div className=" bg-green-200 p-3">
          <h1 className="text-3xl font-bold">Cart</h1>
          <p>Cart items will be here</p>
        </div>
      </div>

      {cart?.map((product: any) => (
        <div
          className="bg-green-100 p-2 w-1/2 m-10 rounded-md flex flex-col "
          key={product._id}
        >
          <h2 className="text-xl font-bolder bg-red-200 p-2">{product.name}</h2>
          <p className="text-xl font-bolder">{product.quantity}</p>
          <p>{product.description}</p>
          <p>₹{product.price.toFixed(2)}</p>
          <button
            className="bg-red-500 p-2 w-10 rounded-md text-white"
            onClick={() => {
              axios
                .delete(
                  "http://localhost:3000/api/cart/delete/" + product._id,
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                  setCart(cart.filter((item) => item._id !== product._id));
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            <Trash2 />
          </button>
        </div>
      ))}
      <div>Total Price</div>
      {cart?.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
    </div>
  );
}

export default Cart;
