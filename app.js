const express = require("express");
require("dotenv").config();

const { connectDB } = require("./db");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connexion DB
connectDB().catch((err) => {
  console.error("Erreur critique DB :", err);
  process.exit(1);
});

// Routes
app.use("/", routes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
