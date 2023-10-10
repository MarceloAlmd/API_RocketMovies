const knex = require("../database/knex");
const DiskStorage = require("../providers/diskStorage");

class UserAvatarController {
  async update(request, response) {
    const avatarFilename = request.file.filename;
    const user_id = request.user.id;
    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("only user authenticated can change avatar", 401);
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);

    user.avatar = filename;

    await knex("users").where({ id: user_id }).update(user);

    return response.json(user);
  }
}

module.exports = UserAvatarController;
