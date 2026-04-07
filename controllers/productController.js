import Product from "../models/Product.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body); // include category ID in req.body
    const populatedProduct = await product.populate("category"); // populate category after creation
    res.json(populatedProduct);
  } catch (error) {
    res.status(500).json({ msg: "Error creating product", error: error.message });
  }
};

// Get all products with category
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // populate category field
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching products", error: error.message });
  }
};

// Get single product by ID with category
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching product", error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("category"); // populate category after update
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ msg: "Error updating product", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting product", error: error.message });
  }
};