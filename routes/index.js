const express = require("express");
const usersRoutes = require("./users");

const router = express.Router();

// Accueil
router.get("/", (req, res) => {
  res.send("Bienvenue sur mon API Express 🚀");
});

// Status
router.get("/status", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    env: process.env.NODE_ENV || "development",
  });
});

// Health
router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Users
router.use("/users", usersRoutes);

module.exports = router;
