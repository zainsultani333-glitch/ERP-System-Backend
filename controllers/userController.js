import User from "../models/User.js";
import bcrypt from "bcryptjs";


// 🔹 Create User
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, employee } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      employee
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// 🔹 Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("employee");
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// 🔹 Get Single User
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("employee");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// 🔹 Update User
export const updateUser = async (req, res) => {
  try {
    const { password } = req.body;

    // If password is updated → hash it
    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// 🔹 Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};