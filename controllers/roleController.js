import Role from "../models/Role.js";

export const createRole = async (req, res) => {
  res.json(await Role.create(req.body));
};

export const getRoles = async (req, res) => {
  res.json(await Role.find());
};

export const getRoleById = async (req, res) => {
  res.json(await Role.findById(req.params.id));
};

export const updateRole = async (req, res) => {
  res.json(await Role.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

export const deleteRole = async (req, res) => {
  await Role.findByIdAndDelete(req.params.id);
  res.json({ msg: "Role deleted" });
};