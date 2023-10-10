const { Router } = require("express");
const usersRoutes = Router();
const multer = require("multer");
const uploadsConfig = require("../configs/uploads");
const UsersController = require("../controller/usersController");
const UserAvatarController = require("../controller/userAvatarController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const upload = multer(uploadsConfig.MULTER);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/", ensureAuthenticated, usersController.delete);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
