const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

require("dotenv").config();

// Récupération du port depuis .env ou fallback 3000
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

let db;
async function connectDB(retries = 25, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      db = await mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      await db.query("SELECT 1"); // test de connexion
      console.log("✅ Connecté à MySQL");
      return;
    } catch (err) {
      console.log(`⏳ MySQL non prêt, retry ${i + 1}/${retries}...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("❌ Impossible de se connecter à MySQL");
}

connectDB();

// Endpoint 1: accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon API Express 🚀");
});

// Endpoint 2: liste d’utilisateurs
app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

app.get("/health", async (req, res) => {
  res.status(200).send("OK");
});

// Endpoint 3: status du serveur
app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    env: process.env.NODE_ENV || "development",
  });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
