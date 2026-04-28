import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import Purchase from "../models/Purchase.js";
import Supplier from "../models/Supplier.js";

// ================= DASHBOARD DATA =================
export const getDashboardData = async (req, res) => {
  try {
    // 🔥 PRODUCTS
    const totalProducts = await Product.countDocuments();

    const allProducts = await Product.find();

    const totalStock = allProducts.reduce(
      (sum, p) => sum + (p.stock || 0),
      0
    );

    const lowStockProducts = allProducts.filter(
      (p) => p.stock <= 5
    );

    // 🔥 SALES
    const sales = await Sale.find().populate("products.product");

    const totalSales = sales.length;

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + (sale.total || 0),
      0
    );

    const recentSales = sales
      .sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate))
      .slice(0, 5);

    // 🔥 PURCHASES
    const purchases = await Purchase.find();
    const totalPurchases = purchases.length;

    const totalPurchaseAmount = purchases.reduce(
      (sum, p) => sum + (p.total || 0),
      0
    );

    // 🔥 SUPPLIERS
    const totalSuppliers = await Supplier.countDocuments();

    // ================= RESPONSE =================
    res.json({
      products: {
        totalProducts,
        totalStock,
        lowStockProducts,
      },
      sales: {
        totalSales,
        totalRevenue,
        recentSales,
      },
      purchases: {
        totalPurchases,
        totalPurchaseAmount,
      },
      suppliers: {
        totalSuppliers,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error loading dashboard",
      error: error.message,
    });
  }
};