const AppError = require("../utils/appError");
const knex = require("../database/knex");
const { hash } = require("bcryptjs");
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const checkEmail = await knex("users").where({ email }).first();

    if (checkEmail) {
      throw new AppError("Email already Exists");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return response.status(201).json({
      message: "User Created",
    });
  }
}

module.exports = UsersController;
