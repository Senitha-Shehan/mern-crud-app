const express = require("express");
const router = express.Router();


const User = require("../Model/UserModel");

const UserController = require("../Controllers/UserController");

router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateById);
router.delete("/:id", UserController.deleteById);

module.exports = router;