import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const { admin } = useContext(UserContext);

  const [products, setProducts] = React.useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      return navigate("/login");
    }
  }, []);

  const addProduct = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/products/add-product",
        products,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="bg-green-200 p-3 w-1/2 m-10 rounded-md flex flex-col">
        <h1>Add Product</h1>
        <form className="flex flex-col gap-5 w-full" method="post">
          <input
            onChange={(e) =>
              setProducts({
                ...products,
                [e.target.name]: e.target.value,
              })
            }
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            onChange={(e) => {
              setProducts({
                ...products,
                [e.target.name]: e.target.value,
              });
            }}
            type="text"
            name="description"
            placeholder="Description"
          />
          <input
            onChange={(e) => {
              setProducts({
                ...products,
                [e.target.name]: e.target.value,
              });
            }}
            type="number"
            name="price"
            placeholder="Price"
          />
          <input
            onChange={(e) => {
              setProducts({
                ...products,
                [e.target.name]: e.target.value,
              });
            }}
            type="number"
            name="quantity"
            placeholder="Quantity"
          />
          <button onClick={addProduct} type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPage;
