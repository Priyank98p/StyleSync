import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Orders from "./pages/Orders.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Product from "./pages/Product.jsx";
import Contact from "./pages/Contact.jsx";
import Collections from "./pages/Collections.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx";
import ShopContextProvider from "./context/ShopContext.jsx";
import Verify from "./pages/Verify.jsx";
import 'react-loading-skeleton/dist/skeleton.css'

// Initializes the data router to manage browser history state and enable fast client-side navigation without full page reloads.
const router = createBrowserRouter([
  {
    path: "/",
    // Acts as a persistent layout wrapper for nested child routes, rendering shared UI (like navbars) while injecting children via an <Outlet />.
    element: <App />,
    children: [
      {
        // Instructs the router to render the Home component by default when the parent path "/" is matched exactly.
        index: true,
        element: <Home />,
      },
      {
        path: "collections",
        element: <Collections />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        // Uses a dynamic URL segment (:productId) to capture the specific item's ID so the Product component can extract it via the useParams hook.
        path: "product/:productId",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "place-order",
        element: <PlaceOrder />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "Verify",
        element: <Verify/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // Wraps the entire routing tree in Context so every single page and component can access or update shared global e-commerce state without prop drilling.
  <ShopContextProvider>
    <RouterProvider router={router} />
  </ShopContextProvider>,
);