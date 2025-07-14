import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.get("/", productController.getProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
