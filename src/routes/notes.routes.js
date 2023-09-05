const { Router } = require("express");
const notesRoutes = Router();

const NotesController = require("../controller/notesController");

const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);

module.exports = notesRoutes;
