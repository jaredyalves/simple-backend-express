const express = require("express");
const { handleNewUser } = require("../controllers/registerController");

const router = express.Router();

router.post("/", handleNewUser);

module.exports = router;
