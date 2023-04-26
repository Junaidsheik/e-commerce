require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db")();

// middlewares
app.use(express.json());
app.use(cors());

// routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
