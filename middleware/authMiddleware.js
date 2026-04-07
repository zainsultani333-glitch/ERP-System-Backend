import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * 🔐 Protect routes (JWT verification)
 * Works for Admin or regular users
 */
export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    // Remove "Bearer " if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get full user info
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: "User not found" });

    req.user = user;

    // Admin bypasses department check
    if (user.role === "admin") {
      req.department = "Admin";
    } else {
      // Optional: department field on user for employees
      req.department = user.department || null;
    }

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

/**
 * 🎭 Authorize Roles
 * Usage: authorizeRoles("admin", "hr")
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ msg: "Role access denied" });
    next();
  };
};

/**
 * 🏢 Authorize Departments
 * Usage: authorizeDepartments("Admin", "HR")
 */
export const authorizeDepartments = (...allowedDepartments) => {
  return (req, res, next) => {
    // Admin bypass → full access
    if (req.user.role === "admin") return next();

    // Department not assigned
    if (!req.department)
      return res.status(403).json({ msg: "Department access denied" });

    // Department not allowed
    if (!allowedDepartments.includes(req.department))
      return res.status(403).json({ msg: "Department access denied" });

    next();
  };
};