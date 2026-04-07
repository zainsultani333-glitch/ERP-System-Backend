import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  const company = await Company.create(req.body);
  res.json(company);
};

export const getCompanies = async (req, res) => {
  res.json(await Company.find());
};

export const getCompanyById = async (req, res) => {
  res.json(await Company.findById(req.params.id));
};

export const updateCompany = async (req, res) => {
  res.json(await Company.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

export const deleteCompany = async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.json({ msg: "Company deleted" });
};