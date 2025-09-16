const mysql = require("mysql2/promise");

let db;

async function connectDB(retries = 45, delay = 2000) {
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
      return db;
    } catch (err) {
      console.log(`⏳ MySQL non prêt, retry ${i + 1}/${retries}...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("❌ Impossible de se connecter à MySQL");
}

function getDB() {
  if (!db) {
    throw new Error("DB non initialisée. Appelle connectDB() avant.");
  }
  return db;
}

module.exports = { connectDB, getDB };
