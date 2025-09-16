const { getDB } = require("../db");

// Récupérer tous les utilisateurs
async function getUsers(req, res) {
  try {
    const db = getDB();
    const [rows] = await db.query("SELECT id, name FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Erreur getUsers:", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
}

module.exports = { getUsers };
