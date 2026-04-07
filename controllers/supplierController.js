import Supplier from "../models/Supplier.js";

// Create a new supplier
export const createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all suppliers
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get a supplier by ID
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ msg: "Supplier not found" });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update a supplier
export const updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSupplier) return res.status(404).json({ msg: "Supplier not found" });
    res.json(updatedSupplier);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete a supplier
export const deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ msg: "Supplier deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};