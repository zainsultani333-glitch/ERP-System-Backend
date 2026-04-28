import Employee from "../models/Employee.js";
import Document from "../models/Document.js";

// ================= HR DASHBOARD =================
export const getHRDashboard = async (req, res) => {
  try {
    // ================= EMPLOYEES =================
    const employees = await Employee.find();

    const totalEmployees = employees.length;

    const recentEmployees = employees
      .slice()
      .reverse()
      .slice(0, 5);

    // ================= DOCUMENTS =================
    const documents = await Document.find();

    const totalDocuments = documents.length;

    const recentDocuments = documents
      .slice()
      .reverse()
      .slice(0, 5);

    // ================= RESPONSE =================
    res.json({
      employees: {
        totalEmployees,
        recentEmployees,
      },
      documents: {
        totalDocuments,
        recentDocuments,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error loading HR dashboard",
      error: error.message,
    });
  }
};