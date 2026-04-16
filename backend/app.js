import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Initialize the Express application
const app = express();

app.use(
  cors({
    // Sets which domain can access your resources (usually defined in .env)
    origin: process.env.CORS_ORIGIN,
    // Allows the server to accept cookies/headers from the frontend
    credentials: true,
  }),
);

// Middleware to parse incoming JSON data
app.use(express.json({ limit: "16kb" }));

// Middleware to parse URL-encoded data (data from forms) 'extended: true' allows for complex nested objects to be parsed
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to serve static files (images, PDF, favicon) from a folder named 'public'
app.use(express.static("public"));

// Middleware to parse cookies from the request headers
// Allows you to access cookies via req.cookies
app.use(cookieParser());

// api endpoints
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.route.js"

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter)

export { app };
