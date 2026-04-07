import Purchase from "../models/Purchase.js";

// Create a new purchase
export const createPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.create(req.body);
    res.json(purchase);
  } catch (error) {
    res.status(500).json({ msg: "Error creating purchase", error: error.message });
  }
};

// Get all purchases
export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching purchases", error: error.message });
  }
};

// Update a purchase
export const updatePurchase = async (req, res) => {
  try {
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns the updated document
    );
    res.json(updatedPurchase);
  } catch (error) {
    res.status(500).json({ msg: "Error updating purchase", error: error.message });
  }
};

// Delete a purchase
export const deletePurchase = async (req, res) => {
  try {
    await Purchase.findByIdAndDelete(req.params.id);
    res.json({ msg: "Purchase deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting purchase", error: error.message });
  }
};