const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },

  composition: [String],

  dosageForm: String,
  strength: String,
  unit: String,

  price: Number,

  category: String,

  source: String,
  lastUpdated: Date
});

module.exports = mongoose.model("Medicine", medicineSchema);