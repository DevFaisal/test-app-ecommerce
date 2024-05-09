import React, { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col gap-5 w-full">
      <div className=" bg-green-200 p-3">
        <h1 className="text-3xl font-bold">Products</h1>
        <p>Products will be here</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {products?.map((product: any) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;

export function Card({ product, onClick }: any) {
  const [count, setCount] = React.useState(1);
  const navigate = useNavigate();
  return (
    <div className="bg-green-100 p-2 w-auto rounded-md flex flex-col ">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <button
        className="px-2 py-1 bg-green-500 text-white rounded-md"
        onClick={async () => {
          const token = localStorage.getItem("token");

          await axios
            .post(
              "http://localhost:3000/api/cart/add",
              {
                productId: product._id,
                quantity: count,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .then((res) => {
              alert("Added to Cart");
            })
            .catch((err) => {
              console.error(err);
              alert("Please Login to add to Cart");
              navigate("/login");
            });
        }}
      >
        Add to Cart
      </button>
      <div className="flex gap-3 justify-center items-center my-3">
        <button onClick={() => setCount(count - 1)}>-</button>
        <div className=" flex justify-center items-center font-md bg-orange-300  rounded-full h-7 w-7">
          <span> {count}</span>
        </div>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}
