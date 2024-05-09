import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import Login from "./components/Login.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import UserContextProvider from "./context/UserContextProvider.tsx";
import Logout from "./components/Logout.tsx";
import Cart from "./components/Cart.tsx";
import UserContext from "./context/UserContext.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </UserContextProvider>
);
