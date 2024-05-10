import React, { useContext, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

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
      <div className="flex flex-col gap-5 w-full">
        {
          <div className="grid grid-cols-3 gap-3 m-10">
            {cart?.map((product: any) => (
              <CartComponent
                key={product._id}
                product={product}
                setCart={setCart}
              />
            ))}
          </div>
        }
        <CardContent className="text-3xl font-bold">
          Total Amount ₹
          {cart?.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
        </CardContent>
      </div>
    </div>
  );
}

export default Cart;

export function CartComponent({ product, setCart }: any) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.quantity}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>₹{product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-red-400"
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
                  setCart((cart: any) => {
                    return cart.filter((item: any) => item._id !== product._id);
                  });
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            <Trash2 />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

//{
/* 
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
    </div> */
//}
