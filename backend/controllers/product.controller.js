import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";

const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields." });
  }

  const createProduct = new ProductModel(product);

  try {
    await createProduct.save();
    res.status(201).json({
      success: true,
      message: "Product is successfully created",
      data: createProduct,
    });
  } catch (error) {
    console.log("Error in creat product", error.message);
    res.status(500), json({ success: false, message: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ sucess: false, message: "Invalid Product Id" });
  }

  try {
    const update = await ProductModel.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });
    res.status(200).json({
      sucess: true,
      message: "produt is sucessfully updated",
      data: update,
    });
  } catch (error) {
    console.log("Error in update product", error.message);
    res.status(404), json({ success: false, message: "Product not found" });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(201).json({
      sucess: true,
      message: "Products Retrieve sucessfully",
      data: products,
    });
  } catch (error) {
    console.log("Error in get product", error.message);
    res.status(401), json({ success: false, message: "Product not found" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ sucess: false, message: "Invalid Product Id" });
  }

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ sucess: true, message: "Product is sucessfully deleted" });
  } catch (error) {
    console.log("Error in delete product", error.message);
    res.status(404), json({ success: false, message: "product not found" });
  }
};

const ProductController = {
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};

export default ProductController