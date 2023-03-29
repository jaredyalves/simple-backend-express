const express = require("express");
const {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} = require("../../controllers/employeesController");
const ROLES = require("../../config/roles");
const verifyRoles = require("../../middleware/verifyRoles");

const router = express.Router();

router
  .route("/")
  .get(getAllEmployees)
  .post(verifyRoles(ROLES.Admin, ROLES.Editor), createEmployee)
  .put(verifyRoles(ROLES.Admin, ROLES.Editor), updateEmployee)
  .delete(verifyRoles(ROLES.Admin), deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;
