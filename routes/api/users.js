const express = require("express");
const {
  deleteUser,
  getAllUsers,
  getUser,
} = require("../../controllers/usersController");
const ROLES = require("../../config/roles");
const verifyRoles = require("../../middleware/verifyRoles");

const router = express.Router();

router
  .route("/")
  .get(verifyRoles(ROLES.Admin), getAllUsers)
  .delete(verifyRoles(ROLES.Admin), deleteUser);

router.route("/:id").get(verifyRoles(ROLES.Admin), getUser);

module.exports = router;
