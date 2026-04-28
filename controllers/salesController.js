import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

// Create a new sale
export const createSale = async (req, res) => {
  try {
    const { products } = req.body;

    // 🔴 CHECK STOCK FIRST
    for (let item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          msg: `${product.name} has only ${product.stock} in stock`,
        });
      }
    }

    // ✅ CREATE SALE
    const sale = await Sale.create(req.body);

    // 🔥 UPDATE STOCK
    for (let item of products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }, // decrease stock
      });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({ msg: "Error creating sale", error: error.message });
  }
};

// Get all sales
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching sales", error: error.message });
  }
};

// Update a sale
export const updateSale = async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns updated document
    );
    res.json(updatedSale);
  } catch (error) {
    res.status(500).json({ msg: "Error updating sale", error: error.message });
  }
};

// Delete a sale
export const deleteSale = async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ msg: "Sale deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting sale", error: error.message });
  }
};