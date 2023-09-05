const { Router } = require("express");
const usersRoutes = Router();

usersRoutes.get("/", (request, response) => {
  return response.json("Create Users Routes")
})


module.exports = usersRoutes