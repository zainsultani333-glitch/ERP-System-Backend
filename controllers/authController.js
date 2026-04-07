import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";

/**
 * 🔹 Register
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role: role || "employee",
      department: department || null // Optional department for employees
    });

    res.status(201).json({
      token: generateToken(user._id),
      user
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/**
 * 🔹 Login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    res.json({
      token: generateToken(user._id),
      user
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};