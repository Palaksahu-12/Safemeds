const express = require("express");
const router = express.Router();
const {
  getMedicines,
  searchMedicine
} = require("../controllers/medicineController");

router.get("/", getMedicines);
router.get("/search", searchMedicine);

module.exports = router;