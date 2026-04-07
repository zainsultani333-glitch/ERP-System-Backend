import Employee from "../models/Employee.js";

export const createEmployee = async (req, res) => {
  const emp = await Employee.create(req.body);
  res.json(emp);
};

export const getEmployees = async (req, res) => {
  res.json(await Employee.find());
};

export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

export const updateEmployee = async (req, res) => {
  try {
    const updatedEmp = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns the updated document
    );
    res.json(updatedEmp);
  } catch (error) {
    res.status(500).json({ msg: "Error updating employee", error: error.message });
  }
};