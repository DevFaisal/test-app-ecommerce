import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

function Products() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products/all")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <h1 className="text-5xl font-bold text-green-800">Loading...</h1>
      </div>
    );
  }
  return (
    <>
      <CardTitle>Products</CardTitle>

      <div className="grid grid-cols-3 gap-3 m-10">
        {products.map((product: any) => (
          <CardComponent key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

export default Products;

export function CardComponent({ product }: any) {
  const [count, setCount] = React.useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <Card>
      {
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
      }
      {
        <CardContent>
          <CardDescription>{product.description}</CardDescription>
          <CardDescription>₹{product.price}</CardDescription>
        </CardContent>
      }
      {
        <CardFooter className="flex justify-between">
          <Button
            onClick={async () => {
              const token = localStorage.getItem("token");

              await axios
                .post(
                  "http://localhost:3000/api/cart/add",
                  {
                    productId: product._id,
                    quantity: 1,
                  },
                  {
                    headers: {
                      Authorization: token,
                    },
                  }
                )
                .then(() => {
                  toast({
                    variant: "default",
                    title: "Added to Cart",
                    description: "Product Added to Cart",
                  });
                })
                .catch((err) => {
                  console.error(err);
                  toast({
                    variant: "destructive",
                    title: "Unauthorized",
                    description: "Please Login to add to Cart",
                  });
                  navigate("/login");
                });
            }}
          >
            Add to Cart
          </Button>
          <div className="flex items-center gap-3">
            <Button
              className="bg-accent-foreground hover:bg-accent-foreground-dark rounded-xl"
              onClick={() => setCount(count - 1)}
            >
              -
            </Button>
            <CardDescription className="font-bold">{count}</CardDescription>
            <Button
              className="bg-accent-foreground hover:bg-accent-foreground-dark rounded-xl"
              onClick={() => setCount(count + 1)}
            >
              +
            </Button>
          </div>
        </CardFooter>
      }
    </Card>
  );
}
