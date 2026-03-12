const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id/tasks", userController.getTasksByUser);

module.exports = router;