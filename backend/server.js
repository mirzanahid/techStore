import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes)


app.listen(5000, () => {
  connectDB();
  console.log("Server Started at http://localhost:5000👍✔");
});
