require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("SafeMeds API Running");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);