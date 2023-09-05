const AppError = require("../utils/appError");

class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      throw new AppError("name is mandatory");
    }
    return response.json("Create Users Routes");
  }
}

module.exports = UsersController;
