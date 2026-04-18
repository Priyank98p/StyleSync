import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProduct from "./pages/AddProduct.jsx";
import ListProduct from "./pages/ListProduct.jsx";
import Orders from "./pages/Orders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: "all-products",
        element: <ListProduct />,
      },
      {
        path: "allorders",
        element: <Orders />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
