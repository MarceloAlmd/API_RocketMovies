const { Router } = require("express");
const usersRoutes = Router();

const UsersController = require("../controller/usersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/", ensureAuthenticated, usersController.delete);

module.exports = usersRoutes;
