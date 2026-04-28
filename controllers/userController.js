import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createNotification } from "../utils/createNotification.js";


// 🔹 Create User
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, employee, permissions } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      employee,
      permissions: permissions || {
        create: false,
        read: true,
        update: false,
        delete: false,
      },
    });

    // 🔔 NOTIFICATION (User Created)
    await Notification.create({
      message: `New user created: ${user.name} (${user.role})`,
      user: user._id,
      read: false,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// 🔹 Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // ✅ simple & correct
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
    const { password, permissions, ...rest } = req.body;

    const updateData = {
      ...rest,
      permissions,
    };

    // ✅ only update password if provided
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after" }
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

    // 🔔 NOTIFICATION (User Deleted)
    await Notification.create({
      message: `User deleted: ${user.name} (${user.email})`,
      user: null,
      read: false,
    });

    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};