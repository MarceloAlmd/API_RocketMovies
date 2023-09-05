const { Router } = require("express");
const usersRoutes = Router();

const UsersController = require("../controller/usersController");

const usersController = new UsersController();

usersRoutes.get("/", usersController.create);

module.exports = usersRoutes;
