const Medicine = require("../models/Medicine");

// Get all medicines
exports.getMedicines = async (req, res) => {
  const meds = await Medicine.find();
  res.json(meds);
};

// Search medicine
exports.searchMedicine = async (req, res) => {
  const query = req.query.q;

  const meds = await Medicine.find({
    name: { $regex: query, $options: "i" }
  });

  res.json(meds);
};