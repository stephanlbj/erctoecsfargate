const express = require("express");
const { getUsers } = require("../controllers/usersController");

const router = express.Router();

// GET /users
router.get("/", getUsers);

module.exports = router;
