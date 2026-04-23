const mongoose = require("mongoose");
const fs = require("fs");
const Medicine = require("../models/Medicine");

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/safemeds");

const importData = async () => {
try {
// Read JSON file
const data = JSON.parse(
fs.readFileSync("../data/nppa_final.json", "utf-8")
);


// Clear old data
await Medicine.deleteMany({});

// Insert new data
await Medicine.insertMany(data);

console.log("Data Imported Successfully");

process.exit();

} catch (error) {
console.error("Error:", error);
process.exit(1);
}
};

importData();
